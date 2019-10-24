import React, { useState, useEffect, useRef } from 'react';
import './Message.css';

export const Message = (props) => {
    const { id, message, userName } = props;
    const [isSelf, setIsSelf] = useState(true);
    const messageScroll = useRef(null);

    useEffect(() => {
        setIsSelf(userName === message.name);
        let node = messageScroll.current;
        node.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });
    }, []);

    return (
        <li className="message-container" key={id}>
            {isSelf ?
                <div ref={messageScroll} className="message-wrapper-self">
                    <div className="message-text-self">{message.message}</div>
                </div> :
                <div ref={messageScroll} className="message-wrapper-them">
                    <div className="message-text-them">{message.message}</div>
                    <div className="message-name-them">{message.name}</div>
                </div>}
        </li>
    );
}