import React from "react";

export const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
