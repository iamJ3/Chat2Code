import socket from "socket.io-client";

let socketInstance = null;

export const initilizeSocket = (projectId) => {
    socketInstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem("token"),
        },
        query:{
         projectId
        }
    });
    return socketInstance;
}

export const reciveMessage = (event, cb) => {
    socketInstance.on(event, cb);
}
export const SendMessage = (event, cb) => {
    socketInstance.emit(event, cb);
}