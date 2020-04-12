import io from "socket.io-client";
import { LIVE_ENDPOINT } from "../config";

export const SOCKET = io.connect(LIVE_ENDPOINT);
