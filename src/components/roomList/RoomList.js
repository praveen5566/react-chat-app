import React from 'react';
import './RoomList.css';
import { Loading } from '../common/loading/Loading';

export function RoomList(props) {
    const { rooms, userName } = props;

    const getRoomName = (rooms) => {
        if (rooms && rooms.length > 0) {
            return rooms.map((room) => <li key={room.id}>{room.name}</li>);
        }
        return <Loading />;
    }

    return (
        <div className="room-list widget">
            <header>{userName}</header>
            <div className="room-list-status">Online for 12 minutes</div>
            <div className="room-list-items">
                {getRoomName(rooms)}
            </div>
        </div>
    );
}