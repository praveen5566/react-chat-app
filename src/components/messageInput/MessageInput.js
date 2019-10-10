import React, { useEffect, useState } from 'react';
import './MessageInput.css';

export const MessageInput = (props) => {
    const [message, setMessage] = useState('');
    const [disable, setDisable] = useState(true);
    const { onSend } = props;

    useEffect(() => {
        message ? setDisable(false) : setDisable(true);
    }, [message]);

    const handleClick = () => {
        if (message) {
            //TODO: message validations
            onSend(message);
            setMessage('');
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleClick();
          }
    }

    return (
        <div className="message-input widget">
            <input
                type="text"
                value={message}
                placeholder="Type a message..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <button disabled={disable} onClick={() => handleClick()}>Send</button>
        </div>
    );
}