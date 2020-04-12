import React, { useState, useEffect } from 'react';
import './UserNameInput.scss';
import { Link } from 'react-router-dom';
import { USER_NAME } from '../../constants';

export const UserNameInput = () => {
    const [userName, setUserName] = useState('');
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        userName ? setDisable(false) : setDisable(true);
    }, [userName]);

    return (
        <div className="userNameInput-container">
            <div className="userNameInput-body">
                <div className="userNameInput-card fade-in-down">
                    <input className="userNameInput-textfield"
                        name="userName"
                        type="text"
                        placeholder="Type your username..."
                        maxLength="256"
                        onChange={e => setUserName(e.target.value)}
                    />
                    <Link onClick={event => (!userName) ? event.preventDefault() : null} to={`/chatWindow?${USER_NAME}=${userName}`}>
                        <button className="userNameInput-button" disabled={disable}>Join a Chat Room!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}