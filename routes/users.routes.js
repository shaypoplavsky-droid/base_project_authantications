const router = require("express").Router();

const {
  getUsers,
  getUser,
  // createNewUser,
  updateExistingUser,
  removeUser,
  login,
  register,
} = require("../controllers/users.controller");
const { authMiddleware, checkAdmin } = require("../middlewares/auth.middleware");

router.post("/login", login);

router.post("/register", register);

router.get("/list", authMiddleware,checkAdmin, getUsers);

router.get("/single/:id", authMiddleware, getUser);

router.put("/update/:id", authMiddleware, updateExistingUser);

router.delete("/delete/:id", authMiddleware, removeUser);

module.exports = router;
