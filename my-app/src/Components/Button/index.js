import React from 'react';

const Button = ({
    content,
    size,
    href,
    color,
    ...props
}) => {
    const Element = 'button';

    if(href) {
        Element = 'a'
    }
    return (
        <Element
            {...props}
        >
            {content || 'Click'}
        </Element>
    )
}

export default Button