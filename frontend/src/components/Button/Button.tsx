import { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button" | "a" | "input";
  href?: string;
  isFullWidth?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const {
    href,
    children,
    type = "button",
    className,
    ...rest
  } = props;

  if (typeof href === "string" && href !== "") {
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        className={classnames(
          "btn",
          className
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classnames(
        "btn",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
