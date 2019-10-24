import io from 'socket.io-client';

export const SOCKET = io.connect('http://localhost:8080');