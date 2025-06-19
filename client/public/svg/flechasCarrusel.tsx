import React from "react";

type Props = {
  width?: string;
  height?: string;
  stroke?: string;
  className?: string;
};

export const FlechaDerecha: React.FC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || "95"}
      height={props.height || "109"}
      viewBox="0 0 95 109"
      fill="none"
      className={props.className}
    >
      <path
        d="M89.9283 49.7092C89.9283 70.207 22.5727 110.261 11.2578 103.557C-0.536018 96.57 17.1927 78.2993 17.192 52.5913C17.1912 26.8833 -2.10091 17.1559 7.41877 7.08097C16.9385 -2.99395 89.9283 29.2116 89.9283 49.7092Z"
        stroke={props.stroke || "white"}
        strokeWidth="9.216"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FlechaIzquierda: React.FC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || "95"}
      height={props.height || "109"}
      viewBox="0 0 95 109"
      fill="none"
      className={props.className} // Permite pasar clases de Tailwind o CSS como prop
    >
      <path
        d="M5.16061 49.7092C5.16061 70.207 72.5162 110.261 83.831 103.557C95.6249 96.57 77.8961 78.2993 77.8969 52.5913C77.8977 26.8833 97.1898 17.1559 87.6701 7.08097C78.1504 -2.99395 5.16061 29.2116 5.16061 49.7092Z"
        stroke={props.stroke || "white"} // Puedes pasar el color del stroke dinámicamente
        strokeWidth="9.216"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
