import { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	as?: "button" | "a" | "input";
	href?: string;
	isFullWidth?: boolean;
	disabled?: boolean;
	children: ReactNode;
	className?: string;
	color?: string;
	isAround?: boolean;
}

const Button = (props: ButtonProps) => {
	const {
		href,
		color,
		isFullWidth,
		children,
		isAround,
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
					isFullWidth && "btn_full",
					color && `btn_${color}`,
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
				isFullWidth && "btn_full",
				color && `btn_${color}`,
				isAround && "btn_around",
				className
			)}
			{...rest}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	isFullWidth: PropTypes.bool,
};

export default Button;
