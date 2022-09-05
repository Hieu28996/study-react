import { forwardRef, Ref, InputHTMLAttributes, useId } from "react";
import classnames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
	disabled?: boolean;
	error?: string;
	type?: string;
}

const Input = forwardRef(function Input(
	props: InputProps,
	ref: Ref<HTMLInputElement>
) {
	const {
		type = "text",
		label,
		className,
		error,
		placeholder,
		...rest
	} = props;
	const id = useId();

	return (
		<div className={classnames("input", className)}>
			<input
				ref={ref}
				id={id}
				type={type}
				placeholder={placeholder}
				autoComplete="off"
				{...rest}
			/>
			<label htmlFor={id}>{label}</label>
			{error && <p className="input_error">{error}</p>}
		</div>
	);
});

export default Input;
