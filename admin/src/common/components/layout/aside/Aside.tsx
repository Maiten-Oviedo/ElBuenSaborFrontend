"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useState, useEffect } from "react";
import { sideBarMenu } from "@/common/lib/constants/sideBarMenu";
import { motion, AnimatePresence } from "framer-motion";

export default function Aside() {
  const [openChildren, setOpenChildren] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const user = useAuthStore((state) => state.empleado);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log(user);
  });

  if (!isMounted) return null;

  const toggleChildren = (label: string) => {
    setOpenChildren(openChildren === label ? null : label);
  };

  const renderChildren = (item: (typeof sideBarMenu)[0]) => {
    return (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-brown-dark-400 rounded-lg w-full mt-3 flex flex-col"
      >
        {item
          .children!.filter((child) =>
            child.allowedRoles?.includes(user?.rol || "ADMIN")
          )
          .map((child) => (
            <Link
              key={child.label}
              className="w-full h-9 pl-6 pr-3 content-center rounded-lg hover:bg-brown-dark-600 flex items-center overflow-hidden"
              href={child.href!}
            >
              <span className="truncate block w-full" title={child.label}>
                {child.label}
              </span>
            </Link>
          ))}
      </motion.div>
    );
  };

  return (
    <aside className="w-58 bg-brown flex flex-col text-sm z-10 shadow-2xl shadow-gray-950">
      <nav className="text-white font-medium mt-4 px-3 flex flex-col gap-6 ">
        {sideBarMenu
          .filter((item) => item.allowedRoles?.includes(user?.rol || "ADMIN"))
          .map((item) => (
            <div
              key={item.label}
              className="w-full min-h-10 py-2 pr-2 pl-4 flex items-center hover:bg-[#5c3614] rounded-lg text-left overflow-hidden"
            >
              {item.children ? (
                <div className="w-full">
                  <button
                    className="w-full h-full flex items-center gap-3 cursor-pointer"
                    onClick={() => toggleChildren(item.label)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <motion.span
                      animate={{ rotate: openChildren === item.label ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      ▸
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openChildren === item.label && renderChildren(item)}
                  </AnimatePresence>
                </div>
              ) : (
                item.href && (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 h-full max-w-[90%]"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )
              )}
            </div>
          ))}
      </nav>
    </aside>
  );
}
