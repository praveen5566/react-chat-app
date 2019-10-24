import io from 'socket.io-client';
import { LOCAL_ENDPOINT } from '../config';

export const SOCKET = io.connect(LOCAL_ENDPOINT);