# Real-Time Chat Application with SignalR

## Overview

This project is a simple real-time chat application where users can join chatrooms and send messages in real-time using **SignalR** in .NET for the backend and **React** for the frontend. The application does not use a database; instead, it uses **ConcurrentMemory** in the backend to store user data and messages temporarily.

### Key Features:
- Real-time messaging with SignalR.
- Users can join different chatrooms by providing their **username** and **chatroom** name.
- Messages are broadcasted to all users in the chatroom instantly.
- A waiting room feature where users can enter their **username** and select a **chatroom** to join.
- Data is stored in memory on the server using **ConcurrentDictionary**.

---

## Technologies Used

- **Backend**: 
  - .NET Core with SignalR for real-time communication.
  - **ConcurrentDictionary** for in-memory storage of chat data.
  
- **Frontend**:
  - ReactJS for building the chatroom UI and waiting room.

---

## Real-Time Communication with SignalR

### How SignalR Works:
SignalR is a library for ASP.NET that allows you to add real-time web functionality to your applications. In this project, we use SignalR to establish a WebSocket connection between the frontend (React) and the backend (.NET). Once the connection is established, the server can send messages to clients in real time.

![Chatroom Screen](.chatroom.png)
![Waiting Room Screen](.waitingroom.png)
