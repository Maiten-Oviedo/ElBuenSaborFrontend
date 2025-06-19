import React from "react";

interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  value,
  label,
  checked,
  disabled = false,
  onChange,
}) => {
  const id = `${name}-${value}`;

  return (
    <label
      htmlFor={id}
      className={`relative w-full h-full flex items-center pl-11 rounded-2xl text-black select-none transition-colors duration-200
        ${
          disabled
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "cursor-pointer bg-white"
        }`}
    >
      {/* Circulo de radio real */}
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={`peer absolute opacity-0 h-0 w-0 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      />
      {/* Circulo de radio custom*/}
      <span
        className={`absolute top-1/4 left-4 h-[20px] w-[20px] rounded-full
          ${
            disabled
              ? "bg-gray-400"
              : "bg-gray-300 peer-hover:bg-red-200 peer-checked:bg-red-800"
          }
          transition-colors duration-200`}
      >
        <span className="absolute hidden peer-checked:block top-[9px] left-[9px] w-[8px] h-[8px] rounded-full bg-white" />
      </span>
      {label}
    </label>
  );
};

export default RadioButton;
