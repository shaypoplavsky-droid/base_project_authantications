const { createUserModel } = require("../models/user.model");
const { readFile, writeFile } = require("../utils/fileManager");

const USERS_PATH = "./data/users.json";

const getAllUsers = () => {
  return readFile(USERS_PATH);
};

const getUserById = (id) => {
  const users = readFile(USERS_PATH);

  return users.find((user) => user.id === Number(id));
};

// older version of createUser without using the model

// const createUser = (userData) => {
//   const users = readFile(USERS_PATH);

//   // const newUser = {
//   //   id: Date.now(),
//   //   name: userData.name,
//   //   email: userData.email,
//   // };

//   const newUser = {
//     id: Date.now(),
//     ...userData,
//   };

//   users.push(newUser);

//   writeFile(USERS_PATH, users);

//   return {userCreated: newUser, message: "User created successfully"};
// };

const createUser = (userData) => {
  const users = readFile(USERS_PATH);

  const newUser = createUserModel(userData);

  users.push(newUser);

  writeFile(USERS_PATH, users);

  return {
    userCreated: newUser,
    message: "User created successfully",
  };
};

const updateUser = (id, userData) => {
  const users = readFile(USERS_PATH);

  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...userData,
  };

  writeFile(USERS_PATH, users);

  return users[userIndex];
};

const deleteUser = (id) => {
  const users = readFile(USERS_PATH);

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return null;
  }

  const filteredUsers = users.filter((u) => u.id !== Number(id));

  writeFile(USERS_PATH, filteredUsers);

  return user;
};

const findByEmail = (email) => {
  const users = readFile(USERS_PATH);

  return users.find(
    (user) => user.email === email
  );
};

// how to change by map 
// const changeUserByMap = (id, userData) => {
//   const users = readFile(USERS_PATH);

//   const updatedUsers = users.map((user) => {
//     if (user.id === Number(id)) {
//       return {
//         ...user,
//         ...userData,
//       };
//     }

//     return user;
//   });

//   writeFile(USERS_PATH, updatedUsers);

//   return updatedUsers.find((user) => user.id === Number(id));
// };

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findByEmail,
};
