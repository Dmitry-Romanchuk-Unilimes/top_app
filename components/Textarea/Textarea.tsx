import React from 'react';
import styles from './Textarea.module.css';
import { TextareaProps } from './Textarea.props';
import cn from 'classnames';

export const Textarea = ({ className, ...props }: TextareaProps): JSX.Element => {
    return (
        <textarea className={cn(className, styles.input)} {...props} />
    );
};