const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { validateUser } = require("../validators/user.validator");
const { createToken } = require("../services/auth.service");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/users.service");
const userService = require("../services/users.service");
const { validateUser } = require("../validators/user.validator");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key_here";

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = userService.findByEmail(email);

  if (!user || !user.password) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = bcrypt.compareSync(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    {
      // h1 is time for token to expire, after 1 hour the user will need to login again to get a new token
      expiresIn: "7d",
    }
  );

  res.json({
    success: true,
    token,
    role: user.role,
  });
};


const register = (req, res) => {
  const error = validateUser(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }

  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    10
  );

  const result = userService.createUser({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result.userCreated,
  });
};

const getUsers = (req, res) => {
  try {
    const users = getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUser = (req, res) => {
  try {
    const user = getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// const createNewUser = (req, res) => {
//   try {
//     const user = createUser(req.body);

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// older create user
// const createNewUser = (req, res) => {
//   const error = validateUser(req.body);

//   if (error) {
//     return res.status(400).json({
//       success: false,
//       message: error,
//     });
//   }

//   const result = userService.createUser(req.body);

//   res.status(201).json({
//     success: true,
//     message: result.message,
//     data: result.userCreated,
//   });
// };

const updateExistingUser = (req, res) => {
  try {
    const user = updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeUser = (req, res) => {
  try {
    const user = deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  login,
  getUsers,
  getUser,
  register,
  updateExistingUser,
  removeUser,
};