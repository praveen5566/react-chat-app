import React, { useState, useEffect } from 'react';
import './UserNameInput.css';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/ddLogo.svg';
import { USER_NAME } from '../../constants';

export const UserNameInput = () => {
    let history = useHistory();
    const [userName, setUserName] = useState('');
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        userName ? setDisable(false) : setDisable(true);
    }, [userName]);

    const handleClick = () => {
        if (userName) {
            localStorage ? localStorage.setItem(USER_NAME, userName) : console.log('local storage not found!');
            history.push('/chatWindow');
        }
    }

    return (
        <div className="userNameInput-container">
            <div className="userNameInput-body">
                {/* <img src={logo} className="userNameInput-logo" alt="logo" /> */}
                <div className="userNameInput-card">
                    <input className="userNameInput-textfield"
                        name="userName"
                        type="text"
                        placeholder="Type your username..."
                        maxLength="256"
                        onChange={e => setUserName(e.target.value)}
                    />
                    <button className="userNameInput-button" disabled={disable} onClick={() => handleClick()}>Join the DoorDash Chat!</button>
                </div>
            </div>
        </div>
    );
}