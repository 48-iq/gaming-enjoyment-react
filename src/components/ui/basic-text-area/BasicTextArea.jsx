import React from 'react';
import cl from './basic-text-area.module.css'

const BasicTextArea = ({...props}) => {
    return (
        <textarea className={cl.basicTextArea} {...props}/>
    );
};

export default BasicTextArea;