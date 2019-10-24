import React, { useState, useEffect } from 'react';
import './UserNameInput.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/ddLogo.svg';
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
                <img src={logo} className="userNameInput-logo fade-in" alt="logo" />
                <div className="userNameInput-card fade-in-down">
                    <input className="userNameInput-textfield"
                        name="userName"
                        type="text"
                        placeholder="Type your username..."
                        maxLength="256"
                        onChange={e => setUserName(e.target.value)}
                    />
                    <Link onClick={event => (!userName) ? event.preventDefault() : null} to={`/chatWindow?${USER_NAME}=${userName}`}>
                        <button className="userNameInput-button" disabled={disable}>Join the DoorDash Chat!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}