import React from "react";

export const Switch = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700">{label}</span>
      <label className="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <span
          className={`toggle-label block w-10 h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out ${
            checked ? "bg-blue-600" : "bg-gray-400"
          }`}
        ></span>
      </label>
    </div>
  );
};
