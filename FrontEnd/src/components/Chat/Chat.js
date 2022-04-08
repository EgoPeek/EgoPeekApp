import React, { useState, useEffect } from 'react'
import Socket from './socket'
import Header from '../Misc/CustomComponents/Header'
import './Chat.css'
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';


function Chat() {

    const userID = window.localStorage.getItem('userID')
    const username = window.localStorage.getItem('userName')
    const [socket, setSocket] = useState()
    const [messages, setMessage] = useState([])
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        const client = new Socket(userID,setMessage)
        setSocket(client)
        setConnected(true)
        return () => {
            socket?.disconnect()
            setConnected(false)
        }
    }, [])

    useEffect(() => {
        if (!socket) return;
        let timeoutID;


        // checks if a user leaves the tab or not
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                //sets the timeout to disconnect from the socket once disconnected
                timeoutID = setTimeout(() => {
                    socket.disconnect();
                    console.log('left tab');
                    setConnected(false);

                }, 5000)

            } else {
                // clears the timeout if that elapsed time hasn't passed yet otherwise it connects back to the server
                console.log('returned to tab');
                clearTimeout(timeoutID)
                if (!connected) {
                    console.log('connected again')
                    socket.connect()
                    setConnected(true);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [connected]);



    const messageSent = (newMessage) => {
        const payload = {
            username: username,
            body: newMessage,
            userID: userID
        }
        console.log('Sending message: ', payload)
        socket.send(JSON.stringify(payload))
    }

    return (
        <div>
            <Header />
            <div className='Chat' >
                <div className='papa-container'>
                    <div className='title'>CHAT BITCHES</div>
                    {!connected ? <p>...</p>
                        :
                        <>
                            <ChatWindow messages={messages} username={username} />
                            <ChatInput onSend={messageSent} />
                        </>
                    }
                </div>
            </div>
        </div>
    )

} export default Chat;