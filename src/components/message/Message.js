import React, { useState, useEffect, useRef } from 'react';
import './Message.css';
import { USER_NAME } from '../../constants';

export const Message = (props) => {
    const { id, message } = props;
    const [isSelf, setIsSelf] = useState(true);
    const messageScroll = useRef(null);

    useEffect(() => {
        setIsSelf(localStorage.getItem(USER_NAME) === message.name);
        let node = messageScroll.current;
        node.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });
    }, []);

    return (
        <li key={id}>
            {isSelf ?
                <div ref={messageScroll} className="message-wrapper-self">
                    <div className="message-text-self">{message.message}</div>
                </div> :
                <div ref={messageScroll} className="message-wrapper">
                    <div className="message-text">{message.message}</div>
                    <div className="message-name">{message.name}</div>
                </div>}
        </li>
    );
}