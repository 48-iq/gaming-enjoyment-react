import React from 'react';
import cl from './image-input.module.css'

const ImageInput = ({children, ...props}) => {
    return (
        <>
        <input id="real-input" type="file" {...props}
                hidden
                accept="image/*"/>
        <label htmlFor="real-input" className={cl.imageInput}>{children}</label>
        </>
    );
};

export default ImageInput;