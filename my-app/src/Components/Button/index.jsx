
import React from 'react';
import classNames from 'classnames';

const Button = ({
    content,
    size,
    href,
    color,
    ...props
}) => {
    let Element = 'button';

    if(href) {
        Element = 'a'
    }


    const setColor = color => {
        switch(color) {
            case 'red':
                return 'btn_red'
                break;
            default:
                return 'btn_blue'
                break;
        }
    }

    const setSize = size => {
        switch(size) {
            case 'large':
                return 'btn_large'
                break;
            case 'small':
                return 'btn_small'
                break;
            default:
                return 'btn_medium'
                break;
        }
    }

    return (
        <Element
            className={
                classNames(
                    'btn',
                    setColor(color),
                    setSize(size)
                )
            }
            href={href}
            {...props}
        >
            {content || 'Click'}
        </Element>
    )
}

export default Button