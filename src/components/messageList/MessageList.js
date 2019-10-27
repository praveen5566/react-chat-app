import React from 'react';
import './MessageList.scss';
import { Loading } from '../common/loading/Loading';
import { Message } from '../message/Message';

export const MessageList = (props) => {
    const { messageList, userName } = props;

    const getMessages = (messages) => {
        if (messages && messages.length > 0) {
            return messages.map(message => <span key={message.id}><Message userName={userName} id={message.id} message={message} /></span>);
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