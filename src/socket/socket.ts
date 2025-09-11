import { io } from "socket.io-client"

const socket_url = import.meta.env.VITE_PUBLIC_Socket

const socket = io(socket_url, {
    transports: ["websocket"],
    autoConnect: false
})

export const socketConnect = () => {
    socket.connect()
}

export const socketDisconnect = () => {
    socket.disconnect()
}

export default socket