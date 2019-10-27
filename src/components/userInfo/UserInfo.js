import React, { useState, useEffect } from 'react';
import './UserInfo.scss';

export const UserInfo = (props) => {
    const { userName, isUserActive } = props;
    const [userStatus, setUserStatus] = useState(0);
    const [onlineStatus, setOnlineStatus] = useState(true);
    let userLoginTime;

    useEffect(() => {
        userLoginTime = new Date();
        setInterval(() => checkUserStatus(), 1000);
    }, []);

    useEffect(() => {
        userLoginTime = new Date();
    }, [onlineStatus]);

    const getOnlineStatus = (isUserActive) => {
        if (!onlineStatus) {
            return 'Offline';
        } else if (!isUserActive) {
            return 'Away';
        }
        return userStatus > 2 ? `Online for ${userStatus} minutes` : 'Online';
    }

    const checkUserStatus = () => {
        setOnlineStatus(navigator.onLine);
        if (userLoginTime) {
            let timeDifference = (new Date() - new Date(userLoginTime));
            let timeDifferenceMins = Math.round(((timeDifference % 86400000) % 3600000) / 60000);
            setUserStatus(timeDifferenceMins);
        }
    }

    return (
        <div className="user-info">
            <header>{userName}</header>
            <div className="user-status">{getOnlineStatus(isUserActive)}</div>
        </div>
    );
}