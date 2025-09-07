import React from "react";

type PillProps = {
    label: string;
    onClick?: (label: string) => void;
    selected?: boolean;
};

const Pill: React.FC<PillProps> = ({ label, onClick, selected = false }) => (
    <button
        onClick={() => onClick && onClick(label)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition hover:cursor-pointer
      ${selected
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700  hover:text-blue-500 "}
      focus:outline-none`}
        type="button"
    >
        {label}
    </button>
);

export default Pill;
