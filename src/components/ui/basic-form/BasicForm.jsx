import React from 'react';
import cl from './basic-form.module.css';

const BasicForm = ({children, ...props}) => {
    return (
        <form className={cl.basicForm} {...props}>
            {children}
        </form>
    );
};

export default BasicForm;