import React from 'react';
import './MessageList.css';
import { Loading } from '../common/loading/Loading';
import { Message } from '../message/Message';

export const MessageList = (props) => {
    const { messageList } = props;

    const getMessages = (messages) => {
        if (messages && messages.length > 0) {
            return messages.map(message => <Message message={message}/>);
        }
        return <Loading />;
    }

    return (
        <div className="messages widget">
            <div className="message-list">
                {getMessages(messageList)}
            </div>
        </div>
    );
}