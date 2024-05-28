const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import cors package

const app = express();
const server = http.createServer(app);

// Apply CORS middleware for regular HTTP requests
app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow only GET and POST requests
    credentials: true // Allow credentials (e.g., cookies, authorization headers)
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send_message', (message) => {
    io.emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


