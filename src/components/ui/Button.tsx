import React from "react";

type ButtonProps = {
  type: "button" | "submit";
  title: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const Button: React.FC<ButtonProps> = ({
  type,
  title,
  className,
  disabled,
  onClick,
  icon,
  iconPosition = "left",
}) => {
  return (
    <div>
      <button
        type={type}
        className={`${className}`}
        disabled={disabled}
        onClick={onClick}
      >
        {icon && iconPosition === "left" ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginRight: 8,
            }}
          >
            {icon}
          </span>
        ) : null}
        {title}
        {icon && iconPosition === "right" ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginLeft: 8,
            }}
          >
            {icon}
          </span>
        ) : null}
      </button>
    </div>
  );
};

export default Button;
