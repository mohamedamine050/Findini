const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const multer = require('multer'); // Import multer

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../my-app/public");  
    cb// Définir le dossier où les images seront enregistrées
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname ); // Nom de fichier unique
  }
});

// Initialiser Multer
const upload = multer({ storage: storage });


const storageAssets = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../my-app/public");  // Save in 'assets' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Retain original file name
  }
});

const uploadToAssets = multer({ storage: storageAssets });




// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',     // Replace with your database host
    user: 'root',          // Replace with your MySQL username
    password: '',          // Replace with your MySQL password
    database: 'fundini' // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Routes
app.use(express.json());
//reister , login , lgout , profile

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.send({ error: err });

      if (results.length > 0) {
        return res.send({ data: "User already exists!!" });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, encryptedPassword],
        (err) => {
          if (err) return res.send({ error: err });
          res.send({ status: "ok", data: "User Created" });
        }
      );
    }
  );
});

app.post("/login-user",   (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.send({ error: "An error occurred while processing your request." });

      if (results.length === 0) {
        return res.send({ error: "User doesn't exist!" });
      }

      const user = results[0];

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email, theme: user.theme }, JWT_SECRET);
        console.log(token);
        res.send({ status: "ok", data: token });
      } else {
        res.send({ error: "Email or password incorrect" });
      }
    }
  );
});


app.post("/logout", (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, JWT_SECRET);
    res.send({ status: "Ok", message: "Logged out successfully." });
  } catch (error) {
    return res.send({ error: "Invalid token or already logged out." });
  }
});





app.get("/get-all-user", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.send({ error: err });
    res.send( results );
  });
});

app.post("/delete-user", (req, res) => {
  const { id } = req.body;

  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.send({ error: err });
    res.send({ status: "Ok", data: "User Deleted" });
  });
});

// Chat function authenticateToken
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ error: "Unauthorized" });

    // Split the token into two parts (Bearer token)
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2) {
        return res.status(400).send({ error: "Invalid token format" });
    }

    const secondToken = tokenParts[1];  // Get the second token (JWT token)
    
    // Decode the JWT token
    jwt.verify(secondToken, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ error: "Invalid token" });
        
        // Assuming 'theme' is part of the decoded token
        if (user && user.theme) {
            console.log("Theme:", user.theme);  // Log the 'theme' value
        }

        req.user = user;
        next();
    });
}

// Get User Profile
// Get User Profile
app.get("/profile", authenticateToken, (req, res) => {
  const userEmail = req.user.email;

  db.query(
      "SELECT id, name, email FROM users WHERE email = ?",
      [userEmail],
      (err, results) => {
          if (err) return res.status(500).send({ error: err });
          if (results.length === 0) return res.status(404).send({ error: "User not found" });
          res.send({ status: "ok", data: results[0] });
      }
  );
});

// Update User Profile
app.post("/profile", authenticateToken, (req, res) => {
  const { name, email } = req.body;
  const userEmail = req.user.email;

  db.query(
      "UPDATE users SET name = ?, email = ? WHERE email = ?",
      [name, email, userEmail],
      (err) => {
          if (err) return res.status(500).send({ error: err });
          res.send({ status: "ok", message: "Profile updated successfully" });
      }
  );
});


// Categories API

app.post('/categories', upload.fields([
  { name: 'image', maxCount: 1 },
  
]), (req, res) => {
  try {
    const imageFile = req.files['image'] ? req.files['image'][0].originalname : null;
    
    const namec = req.body.name;

    
    const sql = "INSERT INTO categories (name, image) VALUES (?, ?)";
    const values = [namec, imageFile];

   
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Database error', error: err.message });
      }

      res.send({
        message: 'Project added successfully',
        data: {
          id: result.insertId,
          name: namec,
          image: imageFile,
         
        }
      });
    });
  } catch (err) {
    res.status(400).send({ message: 'Failed to upload files', error: err.message });
  }
});
  
app.delete('/categories/:id', (req, res) => {
  const categoryId = req.params.id;

  
  const query = 'DELETE FROM categories WHERE id = ?';

  db.query(query, [categoryId], (err, result) => {
    if (err) {
      console.error('Error deleting category:', err);
      return res.status(500).json({ message: 'Server error' });
    }

   
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  });
});
  
app.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des catégories:', err);
        return res.status(500).send('Erreur serveur');
      }
      res.send(results);
    });
});

app.get('/categories/limit', (req, res) => {
    const sql = 'SELECT * FROM categories LIMIT 4';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des catégories:', err);
        return res.status(500).send('Erreur serveur');
      }
      res.send(results);
    });
});

/// Project
app.get('/projects', (req, res) => {
  const sql = 'SELECT * FROM projects';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des projets:', err);
      return res.status(500).send('Erreur serveur');
    }
    res.send(results);
  });
  }
);

app.post(
  '/projects',
  authenticateToken,
  uploadToAssets.fields([
    { name: 'image', maxCount: 1 }, // Only allow one image
  ]),
  (req, res) => {
    try {
      // Obtenez les données envoyées par le formulaire
      const imageFile = req.files['image'] ? req.files['image'][0].originalname : null;
      const { name, goal, categorie_name, user_mail } = req.body;

      // Email utilisateur authentifié
      const userEmail = req.user.email;

      // Vérifiez si l'utilisateur existe
      db.query(
        "SELECT email FROM users WHERE email = ?",
        [userEmail],
        (err, results) => {
          if (err) {
            return res.status(500).send({ error: "Database error", details: err.message });
          }
          if (results.length === 0) {
            return res.status(404).send({ error: "User not found" });
          }

          const email = results[0].email;

          // Insérer les données dans la table `projects`
          const sql = `
            INSERT INTO projects 
            (name, image, goal, totalle, categorie_name, user_mail) 
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          const values = [name, imageFile, goal, 0, categorie_name, email];

          db.query(sql, values, (err, result) => {
            if (err) {
              return res.status(500).send({ error: "Failed to insert project", details: err.message });
            }

            // Réponse de succès avec les détails du projet inséré
            res.status(201).send({
              message: 'Project added successfully',
              data: {
                id: result.insertId,
                name,
                image: imageFile,
                goal,
                totalle: 0,
                categorie_name,
                user_mail: email,
                status: 'in progress',
              },
            });
          });
        }
      );
    } catch (err) {
      // Gestion des erreurs globales
      res.status(400).send({ error: "An error occurred", details: err.message });
    }
  }
);
app.get('/projects/status', (req, res) => {
  const sql = 'SELECT * FROM projects WHERE status = "in progress" ';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des projets:', err);
      return res.status(500).send('Erreur serveur');
    }
    res.send(results);
  });
  }
);



app.put('/projects/:id', (req, res) => {
  const { status } = req.body; // accepted or rejected
  const { id } = req.params;
  const sql = 'UPDATE projects SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Status updated successfully' });
  });
});




//donation 
app.post('/donation', authenticateToken, (req, res) => {
  const { id_project, project_name, amount } = req.body;
  const userEmail = req.user.email;

  // Validate the input
  if (!id_project || !project_name || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'All fields are required: id_project, project_name, amount' });
  }

  // Check if the user exists
  db.query('SELECT email FROM users WHERE email = ?', [userEmail], (err, userResults) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const email = userResults[0].email;

    // Insert the donation into the database
    db.query(
      'INSERT INTO donation (id_project, project_name, amount, user_mail) VALUES (?, ?, ?, ?)',
      [id_project, project_name, amount, email],
      (err, donationResult) => {
        if (err) {
          console.error('Error inserting donation:', err);
          return res.status(500).json({ error: 'Failed to create donation' });
        }

        // Check if the project exists
        db.query('SELECT * FROM projects WHERE id = ?', [id_project], (err, projectResults) => {
          if (err) {
            console.error('Error fetching project:', err);
            return res.status(500).json({ error: 'Failed to fetch project', details: err.message });
          }
          if (projectResults.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
          }

          const project = projectResults[0];
          const newDonations = parseFloat(project.totalle || 0) + parseFloat(amount);

          // Update the total donations for the project
          db.query(
            'UPDATE projects SET totalle = ? WHERE id = ?',
            [newDonations, id_project],
            (err) => {
              if (err) {
                console.error('Error updating project donations:', err);
                return res.status(500).json({ error: 'Failed to update project donations' });
              }

              // Respond with success
              res.status(201).json({
                message: 'Donation created successfully',
                donationId: donationResult.insertId,
              });
            }
          );
        });
      }
    );
  });
});


app.get('/donationHistorique', authenticateToken, (req, res) => {
  // Extract the token from the request headers (Authorization: Bearer <token>)
  const userEmail = req.user.email;

  db.query('SELECT email FROM users WHERE email = ?', [userEmail], (err, userResults) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const email = userResults[0].email;

  // Verify the token and extract the email
   // Assuming the email is in the token payload

    // SQL query to get donations by the user's email
    const query = 'SELECT project_name, amount FROM donation WHERE user_mail = ?';
    
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results);  // Return the filtered results as a JSON response
    });
  });
});



// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
