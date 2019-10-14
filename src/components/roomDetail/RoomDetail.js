import React from 'react';
import './RoomDetail.css';
import { Loading } from '../common/loading/Loading';

export const RoomDetail = (props) => {
    const { roomName, roomUsers } = props;

    const getRoomUsers = (users) => {
        if (users && users.length > 0) {
            return users.join(', ');
        }
        return <Loading />;
    }

    return (
        <div className="room-detail widget">
            <header>{roomName}</header>
            <div className="room-detail-users">{getRoomUsers(roomUsers)}</div>
        </div>
    );
}