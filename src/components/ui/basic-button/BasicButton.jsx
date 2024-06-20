import React from 'react';
import cl from './basic-button.module.css';
const BasicButton = ({children, ...props}) => {
    return (
        <button className={cl.basicButton} {...props}>
            {children}
        </button>
    );
};

export default BasicButton;