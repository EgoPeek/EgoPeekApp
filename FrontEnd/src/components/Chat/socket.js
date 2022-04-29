// filename: socket.js
// Socket class that controls all of the sockets functionality 


/**
 * @description Socket class that handles functionality of all socket.io requests
 * @param chatGame
 * @param userID
 * @param messageRef
 */
export default class Socket {
    #socket;
    send;
    #setMessageRef;
    #messages = [];
    #url;

    #messageHandler = (newMessage) => {
        // console.log('Message received...')
        // console.log('Old Messages: ', this.#messages)

        const newMessages = this.#messages.concat(newMessage)

        // console.log('New Messages: ', newMessages)
        this.#messages = newMessages
        this.#setMessageRef(newMessages)
    }

    constructor(chatGame, userID, messageRef) {
        this.#url = 'ws://localhost:5000/api/v1/chat/' + chatGame + '/' + userID; // change this to 'ws://13.57.35.14:80/api/v1/chat/' in prod
        console.log(this.#url, 'URL')
        this.connect()
        this.#setMessageRef = messageRef

    }

    connect() {
        this.#socket = new WebSocket(this.#url)
        this.#socket.onopen = (e) => {
            console.log('opened socket connection')
        }

        this.#socket.onclose = (e) => {
            console.log('closed socket connection: ', e.code, e.reason)
        }

        this.#socket.onmessage = (e) => {
            // idk why but sometimes the data gets returned as "YOUR MESSAGE : {obj stff}"
            // really weird
            try {
                const jsonData = JSON.parse(e.data)
                this.#messageHandler(jsonData)
            }catch(e){
                return
            }
        }

        this.send = this.#socket.send.bind(this.#socket)
    }
    disconnect() {
        if (this.#socket.readyState === WebSocket.OPEN) {
            this.#socket.close()
            console.log('SOCKET DISCONNECTED')
        }
    }
}
