import { LOCAL_ENDPOINT } from "../config";

const baseUrl = LOCAL_ENDPOINT;
const apiPrefix = "/api";

// export const fetchData = (url, options) => {
//     return fetch(url, options).then(data => data.json()).then(data => data).catch((e) => { throw e; });
// }

export const fetchData = async (url, options) => {
  try {
    const data = await fetch(url, options);
    const jsonData = await data.json();
    return jsonData;
  } catch (e) {
    throw e;
  }
};

export const getRoomList = () => {
  const url = `${baseUrl}${apiPrefix}/rooms`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetchData(url, options);
};

export const getRoomDetail = roomId => {
  const url = `${baseUrl}${apiPrefix}/rooms/${roomId}`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetchData(url, options);
};

export const getMessagesByRoomId = roomId => {
  const url = `${baseUrl}${apiPrefix}/rooms/${roomId}/messages`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetchData(url, options);
};

export const postMessages = (roomId, payload) => {
  const url = `${baseUrl}${apiPrefix}/rooms/${roomId}/messages`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  };

  return fetchData(url, options);
};
