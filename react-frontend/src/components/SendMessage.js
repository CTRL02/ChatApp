import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

const SendMessage = ({ connection }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() && connection) {
            try {
                await connection.invoke('SendMessage', message);
                setMessage('');
            } catch (e) {
                console.error('Error sending message: ', e);
            }
        }
    };

    return (
        <Form onSubmit={sendMessage}>
            <Form.Group className="mb-3" controlId="formMessage">
                <FormControl
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Send
            </Button>
        </Form>
    );
};

export default SendMessage;
