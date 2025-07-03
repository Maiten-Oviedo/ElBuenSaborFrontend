"use client"

import { useState, useEffect } from "react"

type Tab = {
  label: string;
  key: string;
  content: React.ReactNode;
  color?: string;
};

type TabsProps = {
  tabs: Tab[];
  currentTab: string;
  onTabChange: (key: string) => void;
};

export const Tabs = ({ tabs, currentTab, onTabChange }: TabsProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [internalActiveKey, setInternalActiveKey] = useState(tabs[0]?.key)

  const isControlled = typeof currentTab === "string"

  useEffect(() => {
    if (!isControlled && tabs.length > 0) {
      setInternalActiveKey(tabs[0].key)
    }
  }, [tabs])

  const activeKey = isControlled ? currentTab! : internalActiveKey

  const handleTabChange = (key: string) => {
    if (!isControlled) setInternalActiveKey(key)
    onTabChange?.(key)
  }

  const hexToRgba = (hex: string, alpha: number) => {
    const sanitizedHex = hex.replace("#", "")
    const bigint = parseInt(sanitizedHex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  if (!isClient) return null; // 🔒 Solución clave: evitar render hasta que esté en cliente

  return (
    <div>
      {/* Títulos */}
      <div className="mb-4 border-b border-gray-200 h-[50px]">
        <ul className="flex w-full text-sm font-medium text-center">
          {tabs.map((tab) => {
            const isActive = tab.key === currentTab;
            const color = tab.color || "#3B82F6";

            return (
              <li key={tab.key} className="flex-1 relative h-[45px]">
                <button
                  onClick={() => handleTabChange(tab.key)}
                  className="absolute bottom-0 w-full border-b-2 rounded-t-lg transition-all duration-200 ease-in-out flex items-center justify-center font-bold"
                  style={{
                    height: isActive ? "40px" : "29px",
                    backgroundColor: isActive ? color : hexToRgba(color, 0.7),
                    borderColor: isActive ? color : "transparent",
                    color: isActive ? "#ffffff" : "#cecece",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Contenido */}
      <div className="p-4 rounded-lg bg-none">
        {tabs.find(tab => tab.key === currentTab)?.content}
      </div>
    </div>
  )
}
