import React from "react";

const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
