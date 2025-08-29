import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon: Icon, 
  className = "", 
  ...props 
}) => {
  return (
    <button
  className={`bg-green-500 text-white font-sans py-3 px-8 text-lg font-semibold rounded-full hover:cursor-pointer hover:bg-green-700 transition-all duration-500 delay-75 hover:translate-y-[-4px] inline-flex items-center gap-3 shadow-lg hover:shadow-xl ${className}`}
  {...props}
>
  {Icon && <Icon className="w-6 h-6" />}
  {children}
</button>
  );
};

export default Button;