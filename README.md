# WebSocket Chat Application

A real-time chat application built with **Node.js** and **WebSockets**, enabling users to register, authenticate, and exchange direct messages with offline message support.

---

## ⚙️ Features

- Real-time messaging using raw WebSocket handlers (no STOMP)
- User registration & login (username/password)
- Live tracking of online users and status updates
- Direct messaging with immediate delivery or offline queuing
- Delivery of stored messages when users reconnect
- Conversation history retrieval on reconnect
- Runtime persistence using H2 in-memory database
- Spring Data JPA for persistence
- Basic Spring Security for API endpoints
- Minimal frontend with pure HTML & JavaScript + SockJS

---

## 🚀 How It Works

### Flow:
1. Users register or sign in via REST endpoints  
2. After login, a WebSocket connection (`/websocket/chat`) is established  
3. Client authenticates over WebSocket (username message)  
4. Server tracks user sessions & broadcasts online status  
5. Users can send direct `chat` messages to others  
   - If recipient is online → immediate delivery  
   - If offline → message stored and flagged as undelivered  
6. On reconnect, stored messages are delivered in chronological order  
7. Conversation history is fetched automatically

---

## 🔧 Message Types

- `authenticate` – client authorizes user  
- `chat` – sending a message  
- `get_users` – request for online user list  
- `online_users` – server broadcasts current online users  
- `message` – message received from another user  
- `message_sent` – acknowledgment of send/queue

---

## 🗃️ Database Schema

- **Users**: id, username, password (hashed), timestamps  
- **Messages**: senderUsername, recipientUsername, content, sentAt, delivered, deliveredAt

---

## 🛠️ Usage

1. Clone the repo
2. Run:
   ```bash
   mvn clean install
   mvn spring-boot:run
