import React, { useState } from 'react';
import './RoomList.css';
import { Loading } from '../common/loading/Loading';

export const RoomList = (props) => {
    const { rooms, onRoomClick } = props;
    const [selectedRoomId, setSelectedRoomId] = useState(0); //TODO: save previous active chat room.

    const handleRoomItemClick = (roomId) => {
        onRoomClick(roomId);
        setSelectedRoomId(roomId);
    }

    const getRoomName = (rooms) => {
        if (rooms && rooms.length > 0) {
            return rooms.map((room) =>
                <li
                    key={room.id}
                    onClick={() => handleRoomItemClick(room.id)}
                    className={`${selectedRoomId === room.id ? 'room-active' : ''}`}
                >
                    {room.name}
                </li>);
        }
        return <Loading />;
    }

    return (
        <div className="room-list widget">
            <div className="room-list-items">
                {getRoomName(rooms)}
            </div>
        </div>
    );
}