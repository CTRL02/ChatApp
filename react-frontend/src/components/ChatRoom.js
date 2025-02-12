import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MessageContainer from './MessageContainer';

const ChatRoom = ({ messages, username, chatroomName }) => {
    const [localMessages, setLocalMessages] = useState([]);

    useEffect(() => {
        if (username && chatroomName) {
            const joinMessage = { msg: `${username} has joined the chatroom ${chatroomName}`, username: 'System' };
            setLocalMessages(prevMessages => {
                if (!prevMessages.some(message => message.msg === joinMessage.msg && message.username === 'System')) {
                    return [...prevMessages, joinMessage];
                }
                return prevMessages;
            });
        }
    }, [username, chatroomName]);

    useEffect(() => {
        const newMessages = messages.filter(newMsg => !localMessages.some(prevMsg => prevMsg.msg === newMsg.msg && prevMsg.username === newMsg.username));
        if (newMessages.length > 0) {
            newMessages.forEach(message => {
                if (message.username !== username) {
                    playNotificationSound();
                }
            });
            setLocalMessages(prevMessages => [...prevMessages, ...newMessages]);
        }
    }, [messages, localMessages, username]);

    const playNotificationSound = () => {
        const audio = new Audio('/notification.mp3');// Path to your sound file
        audio.play();
    };

    return (
        <div>
            <Row className="px-5 py-5">
                <Col sm={10}>
                    <h2>{chatroomName}</h2>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row className="px-5 py-5">
                <Col sm={12}>
                    <MessageContainer messages={localMessages} />
                </Col>
            </Row>
        </div>
    );
};

export default ChatRoom;
