const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "public", "index.html"));
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(401).json({ message: "Username and password are required." });
  }

  if (username === "test" && password === "test") {
    return res.status(200).json({ token: "dummy-token" });
  }

  return res.status(401).json({ message: "Invalid username or password." });
});

module.exports = app;
