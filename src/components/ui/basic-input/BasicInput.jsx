import React from 'react';
import cl from './basic-input.module.css';
const BasicInput = ({...props}) => {
    return (
        <input className={cl.basicInput} {...props}/>
    );
};

export default BasicInput;