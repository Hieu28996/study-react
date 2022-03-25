import React from "react";
import classNames from "classnames";

const Input = ({
    id, checked, ...props
}) => {
        return (
            <span
                className={classNames(
                    'input'
                )}
            >
                <label htmlFor={id}></label>
                <input
                    id={id}
                    defaultChecked = {checked}
                    {...props}   
                />
            </span>
        );
    }

export default Input