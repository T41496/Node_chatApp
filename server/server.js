const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const { addUser, getUser, getUsersInRoom, removeUser } = require('./users');

// const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// const staticPath = path.join(__dirname, '../public');
app.use(express.static(path.join(__dirname, "..", "build")));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build/index.html"));
});

io.on('connection', (socket) => {

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.emit('message', { user: 'admin', text: `${user.name}! Welcome to the ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` });
    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('locationMessage', { user: user.name, url: `https://www.google.com/maps?q=${latitude},${longitude}` });
    callback();
  });

  socket.on('sendImage', (image, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('imageMessage', {user: user.name, image});
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: "admin", text: `${user.name} has left!` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});