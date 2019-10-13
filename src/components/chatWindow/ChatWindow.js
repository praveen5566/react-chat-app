import React, { useEffect, useState, useMemo } from 'react';
import './ChatWindow.css';
import { RoomList } from '../roomList/RoomList';
import { RoomDetail } from '../roomDetail/RoomDetail';
import { MessageList } from '../messageList/MessageList';
import { MessageInput } from '../messageInput/MessageInput';
import { UserInfo } from '../userInfo/UserInfo';
import { USER_NAME, UNKNOWN_USER } from '../../constants';
import { getRoomList, getRoomDetail, getMessagesByRoomId, postMessages } from '../../api/chatService';

export const ChatWindow = () => {
    const [roomList, setRoomList] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [roomUsers, setRoomUsers] = useState('');
    const [roomId, setRoomId] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [isUserActive, setIsUserActive] = useState(true);
    const [currentMessage, setCurrentMessage] = useState({});

    const channel = useMemo(() => {
        if (window.BroadcastChannel) {
            return new BroadcastChannel('chat-channel');
        }
    }, []);

    useEffect(() => {
        window.addEventListener('focus', onTabFocus);
        window.addEventListener('blur', onTabBlur);
        return () => {
            window.removeEventListener('focus', onTabFocus);
            window.removeEventListener('blur', onTabBlur);
            if (channel) { channel.close() };
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
        if (channel) { channel.onmessage = msg => setCurrentMessage(msg.data); }
    }, [isMessageSent]);

    const onTabFocus = () => {
        setIsUserActive(true)
    };

    const onTabBlur = () => {
        setIsUserActive(false)
    };

    const getUserName = () => {
        return localStorage.getItem(USER_NAME) || UNKNOWN_USER;
    };

    const handleMessageSend = (message) => {
        const name = getUserName();
        if (name && message) {
            const payload = { name, message };
            postMessages(roomId, payload).then((response) => {
                setIsMessageSent(true);
                channel.postMessage(response);
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
            <UserInfo userName={getUserName()} isUserActive={isUserActive} />
            <RoomList rooms={roomList} onRoomClick={handleRoomClick} />
            <RoomDetail roomName={roomName} roomUsers={roomUsers} />
            <MessageList messageList={messageList} />
            <MessageInput onSend={handleMessageSend} />
        </div>
    );
}