


const port = process.env.PORT || 8080
const baseUrl = `http://localhost:${port}`;
const apiPrefix = '/api'

export function fetchData(url, options) {
    return fetch(url, options).then(data => data.json()).then(data => data).catch((e) => { throw e; });
}

export function getRoomList() {
    const url = `${baseUrl}${apiPrefix}/rooms`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetchData(url, options);
}

export function getRoomDetail(roomId) {
    const url = `${baseUrl}${apiPrefix}/rooms/${roomId}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetchData(url, options);
}

export function getMessagesByRoomId(roomId) {
    const url = `${baseUrl}${apiPrefix}/rooms/${roomId}/messages`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetchData(url, options);
}

export function postMessages(roomId, payload) {
    const url = `${baseUrl}${apiPrefix}/rooms/${roomId}/messages`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetchData(url, options);
}