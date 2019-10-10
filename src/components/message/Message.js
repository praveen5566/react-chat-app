import React, { useState, useEffect } from 'react';
import './Message.css';
import { USER_NAME } from '../../constants';

export const Message = (props) => {
    const { id, message } = props;
    const [isSelf, setIsSelf] = useState(true);

    useEffect(() => {
        setIsSelf(localStorage.getItem(USER_NAME) === message.name);
    }, []);

    return (
        <li key={id}>
            {isSelf ?
                <div className="message-wrapper-self">
                    <div className="message-text-self">{message.message}</div>
                </div> :
                <div className="message-wrapper">
                    <div className="message-text">{message.message}</div>
                    <div className="message-name">{message.name}</div>
                </div>}
        </li>
    );
}