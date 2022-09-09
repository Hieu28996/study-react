import { useState, useRef } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "hooks";
import { ReactComponent as IconArrow } from "assets/images/icon/ic_arrow.svg";

export interface SelectProps {
	options: Array<string>;
	activeOption: number;
	onClickSelect: (param: string) => void;
}

const Select = (props: SelectProps) => {
	const { options = [], activeOption, onClickSelect } = props;
	const [active, setActive] = useState(activeOption);
	const [isSelected, setIsSelected] = useState(false);
	const selectRef = useRef(null);

	const handleSelect = () => setIsSelected(!isSelected);
	useOnClickOutside(selectRef, () => setIsSelected(false));

	const handleSelected = (index: number, item: string) => {
		onClickSelect(item);
		setActive(index);
		setIsSelected(false);
	};

	return (
		<div
			className={classNames("select", isSelected && "is_selected")}
			ref={selectRef}
		>
			<button type="button" className="select_btn" onClick={handleSelect}>
				{options.filter((item, index) => index === active)}
				<IconArrow
					className="select_toggle"
					width={24}
					height={24}
					color="#878A8C"
				/>
			</button>
			<div className="select_options">
				<ul>
					{options.map((item, index) => {
						return (
							<li
								key={index}
								className={classNames(
									"select_item",
									index === active ? "is_active" : null
								)}
							>
								<button
									type="button"
									className="select_btn"
									onClick={() => handleSelected(index, item)}
								>
									{item}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Select;
