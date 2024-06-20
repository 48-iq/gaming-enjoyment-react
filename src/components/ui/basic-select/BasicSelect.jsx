import React from 'react';
import cl from './basic-select.module.css';
const BasicSelect = ({children, ...props}) => {
    return (
        <select {...props} className={cl.basicSelect}>
            {children}
        </select>
    );
};

export default BasicSelect;