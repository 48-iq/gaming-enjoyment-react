import React, {useState} from 'react';
import  cl from './modale-window.module.css'
const ModalWindow = ({children, isActive, setIsActive}) => {
    const classes = [cl.modalWindow]
    if (isActive) {
        classes.push(cl.active);
    }
    return (
        <div className={[...classes].join(' ')} onClick={() => setIsActive(false)}>
            <div className={cl.modalWindowContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;