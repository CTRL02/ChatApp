import { Container, Col, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import ChatRoom from './components/ChatRoom';
import SendMessage from './components/SendMessage';

import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
    const [conn, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [chatroomName, setChatroomName] = useState('');

    const joinChatRoom = async (username, chatroom) => {
        try {
            const conn = new HubConnectionBuilder().withUrl("https://localhost:7143/chatHub").configureLogging(LogLevel.Information).build();
            conn.on("ReceiveMessage", (username, msg) => {
                setMessages(messages => [...messages, { username, msg }]);
            });
            conn.on("ReceiveSpecificMessage", (username, msg) => {
                setMessages(messages => [...messages, { username, msg }]);
            });
            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
            setConnection(conn);
            setUsername(username);
            setChatroomName(chatroom);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="App">
            <Container>
                <Row className='px-5 my-5'>
                    <Col sm='12'>
                        <h1 className='font-weight-light'>
                            Hello World and welcome to my ChatRoom!
                        </h1>
                    </Col>
                </Row>
                {
                    !conn
                        ? <WaitingRoom joinChatRoom={joinChatRoom} />
                        : (
                            <>
                                <ChatRoom messages={messages} username={username} chatroomName={chatroomName} />
                                <SendMessage connection={conn} />
                            </>
                        )
                }
            </Container>
        </div>
    );
}

export default App;
