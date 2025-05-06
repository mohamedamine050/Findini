const db = require("../db");

exports.getProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addProject = (req, res) => {
  const image = req.files?.image?.[0]?.originalname || null;
  const { name, goal, categorie_name } = req.body;
  const user_mail = req.user.email;

  db.query(
    "INSERT INTO projects (name, goal, image, categorie_name, user_mail) VALUES (?, ?, ?, ?, ?)",
    [name, goal, image, categorie_name, user_mail],
    (err, result) => {
      if (err) return res.status

