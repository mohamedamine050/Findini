const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length) return res.json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [name, email, hashedPassword], 
      (err) => {
        if (err) return res.json({ error: err });
        res.json({ message: "User registered" });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length === 0) return res.json({ error: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, theme: user.theme }, JWT_SECRET);
    res.json({ message: "Login successful", token });
  });
};

