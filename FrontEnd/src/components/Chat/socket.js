export let send
let messageHandler

export const startSocket = (userID) => {
    const url = 'ws://localhost:5000/api/v1/chat/' + userID
    const socket = new WebSocket(url)

    socket.onopen = () => {
        console.log('opened socket connection')
    }

    socket.onclose = (e) => {
        console.log('closed socket connection: ', e.code, e.reason)
    }

    socket.onmessage = function (e){
        messageHandler && messageHandler(e.data)
    }

    window.addEventListener('unload', function() {
        if(socket.readyState === WebSocket.OPEN){
            socket.close()}
    })
    send = socket.send.bind(socket)
}

export const messageHandlerCallback = (func) => {
    messageHandler = func
}