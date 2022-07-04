import { ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button" | "a" | "input";
  href?: string;
  isFullWidth?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  isPc?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    href,
    isFullWidth = false,
    disabled = false,
    children,
    type = "button",
    className,
    isPc,
    ...rest
  } = props;

  if (typeof href === "string" && href !== "") {
    return (
      <a href={href} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
