import React from "react";

const Button = ({ title, id, rightIcon, leftIcon, containerClass, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}  // tambahkan agar bisa menangani klik
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      type="button"  // agar tidak submit form kalau dipakai di form
    >
      {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {title}
      </span>

      {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
