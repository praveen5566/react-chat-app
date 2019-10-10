


const port = process.env.PORT || 8080
const baseUrl = `http://localhost:${port}`;
const apiPrefix = '/api'


export function getRoomList() {
    const url = `${baseUrl}${apiPrefix}/rooms`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(url, options).then(data => data.json()).then(data => data);
}

export function getRoomDetail(roomId) {
    const url = `${baseUrl}${apiPrefix}/rooms/${roomId}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(url, options).then(data => data.json()).then(data => data);
}

export function getMessagesByRoomId(roomId) {
    const url = `${baseUrl}${apiPrefix}/rooms/${roomId}/messages`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(url, options).then(data => data.json()).then(data => data);
}

export function postMessages(roomId, payload) {
    const url = `${baseUrl}${apiPrefix}/rooms/${roomId}/messages`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(url, options).then(data => data.json()).then(data => data);
}