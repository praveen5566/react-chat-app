import React, { useEffect, useState } from 'react';
import './ChatWindow.css';
import { RoomList } from '../roomList/RoomList';
import { RoomDetail } from '../roomDetail/RoomDetail';
import { MessageList } from '../messageList/MessageList';
import { MessageInput } from '../messageInput/MessageInput';
import { USER_NAME } from '../../constants';
import { getRoomList, getRoomDetail, getMessagesByRoomId, postMessages } from '../../api/chatService';

export const ChatWindow = () => {
    const [roomList, setRoomList] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [roomUsers, setRoomUsers] = useState('');
    const [roomIndex, setRoomIndex] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [isMessageSent, setIsMessageSent] = useState(false);


    useEffect(() => {
        getRoomList().then(data => setRoomList(data)).catch((e) => { console.log(e) });
        getRoomDetail(roomIndex).then((data) => {
            setRoomName(data.name);
            setRoomUsers(data.users);
        }).catch((e) => { console.log(e) });
        getMessagesByRoomId(roomIndex).then((data) => {
            setMessageList(data);
        }).catch((e) => { console.log(e) });
    }, []);

    useEffect(() => {
        getMessagesByRoomId(roomIndex).then((data) => {
            setMessageList(data);
        }).catch((e) => { console.log(e) });
    }, [isMessageSent]);

    const getUserName = () => {
        return localStorage.getItem(USER_NAME) || 'User Name';
    };

    const handleMessageSend = (message) => {
        const name = getUserName();
        if (name && message) {
            const payload = { name, message };
            postMessages(roomIndex, payload).then((response) => {
                setIsMessageSent(true);
                console.log("post message api response", response);
            });
        }
        setIsMessageSent(false);
    }

    return (
        <div className="chat-window">
            <RoomList rooms={roomList} userName={getUserName()} />
            <RoomDetail roomName={roomName} roomUsers={roomUsers} />
            <MessageList messageList={messageList} />
            <MessageInput onSend={handleMessageSend} />
        </div>
    );
}