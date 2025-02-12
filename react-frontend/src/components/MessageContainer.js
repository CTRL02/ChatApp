import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './MessageContainer.css';

const MessageContainer = ({ messages }) => {
    return (
        <ListGroup>
            {messages.map((message, index) => (
                <ListGroup.Item key={index} className="message-bubble">
                    <div className="message-content">{message.msg}</div>
                    <div className="message-username">{message.username}</div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default MessageContainer;
