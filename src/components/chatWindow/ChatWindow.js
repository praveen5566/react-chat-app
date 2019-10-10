import React, { useEffect, useState } from 'react';
import './ChatWindow.css';
import { RoomList } from '../roomList/RoomList';
import { RoomDetail } from '../roomDetail/RoomDetail';
import { MessageList } from '../messageList/MessageList';
import { MessageInput } from '../messageInput/MessageInput';
import { USER_NAME, UNKNOWN_USER } from '../../constants';
import { getRoomList, getRoomDetail, getMessagesByRoomId, postMessages } from '../../api/chatService';

export const ChatWindow = () => {
    const [roomList, setRoomList] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [roomUsers, setRoomUsers] = useState('');
    const [roomId, setRoomId] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [isMessageSent, setIsMessageSent] = useState(false);


    useEffect(() => {
        getRoomList().then(data => setRoomList(data)).catch((e) => { console.log(e) });
        getRoomDetail(roomId).then((data) => {
            setRoomName(data.name);
            setRoomUsers(data.users);
        }).catch((e) => { console.log(e) });
        getMessagesByRoomId(roomId).then((data) => {
            setMessageList(data);
        }).catch((e) => { console.log(e) });
    }, [roomId]);

    useEffect(() => {
        getMessagesByRoomId(roomId).then((data) => {
            setMessageList(data);
        }).catch((e) => { console.log(e) });
    }, [isMessageSent]);

    const getUserName = () => {
        return localStorage.getItem(USER_NAME) || UNKNOWN_USER;
    };

    const handleMessageSend = (message) => {
        const name = getUserName();
        if (name && message) {
            const payload = { name, message };
            postMessages(roomId, payload).then((response) => {
                setIsMessageSent(true);
                console.log("post message api response", response);
            });
        }
        setIsMessageSent(false);
    }

    const handleRoomClick = (roomId) => {
        setRoomId(roomId);
    }

    return (
        <div className="chat-window">
            <RoomList rooms={roomList} userName={getUserName()} onRoomClick={handleRoomClick} />
            <RoomDetail roomName={roomName} roomUsers={roomUsers} />
            <MessageList messageList={messageList} />
            <MessageInput onSend={handleMessageSend} />
        </div>
    );
}