const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!name || !room) {
    return {
      error: 'name and room are required!'
    };
  }
  // Check for existing user
  const existingUser = users.find(user => user.name === name && user.room === room);
  if (existingUser) {
    return {
      error: 'name is already in use!'
    };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter(user => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };