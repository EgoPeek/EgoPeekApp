// filename: socket.js
// Socket class that controls all of the sockets functionality 


/**
 * @description Socket class that handles functionality of all socket.io requests
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

    constructor(userID, messageRef) {
        this.#url = 'ws://localhost:5000/api/v1/chat/' + userID;
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
