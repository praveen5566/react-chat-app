import React, { useEffect, useState } from 'react';
import './ChatWindow.css';
import { RoomList } from '../roomList/RoomList';
import { RoomDetail } from '../roomDetail/RoomDetail';
import { MessageList } from '../messageList/MessageList';
import { MessageInput } from '../messageInput/MessageInput';
import { UserInfo } from '../userInfo/UserInfo';
import { getRoomList, getRoomDetail, getMessagesByRoomId, postMessages } from '../../api/chatService';
import { SOCKET } from '../../api/socket';
import queryString from 'query-string';

export const ChatWindow = () => {
    const [roomList, setRoomList] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');
    const [roomUsers, setRoomUsers] = useState('');
    const [roomId, setRoomId] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [isUserActive, setIsUserActive] = useState(true);
    const [currentMessage, setCurrentMessage] = useState({});

    useEffect(() => {
        const { username } = queryString.parse(window.location.search);
        setUserName(username);
        SOCKET.emit('join', { username });
        window.addEventListener('focus', onTabFocus);
        window.addEventListener('blur', onTabBlur);
        
        return () => {
            SOCKET.emit('disconnect');
            SOCKET.off();
            window.removeEventListener('focus', onTabFocus);
            window.removeEventListener('blur', onTabBlur);
        };
    }, []);

    useEffect(() => {
        getMessagesByRoomId(roomId).then((data) => {
            setMessageList(data);
        }).catch((e) => { console.log(e) });
    }, [currentMessage]);

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
        SOCKET.on('new_message', data => setCurrentMessage(data.message));
    }, [isMessageSent]);

    const onTabFocus = () => {
        setIsUserActive(true)
    };

    const onTabBlur = () => {
        setIsUserActive(false)
    };

    const handleMessageSend = (message) => {
        if (userName && message) {
            const payload = { name: userName , message };
            postMessages(roomId, payload).then((response) => {
                setIsMessageSent(true);
                SOCKET.emit('new_message', { message });
            });
        }
        setIsMessageSent(false);
    }

    const handleRoomClick = (roomId) => {
        setRoomId(roomId);
    }

    return (
        <div className="chat-window">
            <UserInfo userName={userName} isUserActive={isUserActive} />
            <RoomList rooms={roomList} onRoomClick={handleRoomClick} />
            <RoomDetail roomName={roomName} roomUsers={roomUsers} />
            <MessageList userName={userName} messageList={messageList} />
            <MessageInput userName={userName} onSend={handleMessageSend} />
        </div>
    );
}