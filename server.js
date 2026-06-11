const express = require("express");

const usersRoutes = require("./routes/users.routes");
// const logger = require("./middlewares/logger.middleware");

const app = express();

app.use(express.json());
// app.use(logger);

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });
});

const PORT = 8000;


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
