const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");

// Middleware pour servir les fichiers statiques (CSS, JS, images) 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'view')));
// Routes simples pour afficher les pages HTML 
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'view', 'dashboard.html')); 
}); 
app.get('/medicines', (req, res) => { 
    res.sendFile(path.join(__dirname, 'view', 'medicines.html')); 
}); 
app.get('/sales', (req, res) => { 
    res.sendFile(path.join(__dirname, 'view', 'sales.html')); 
}); 
app.get('/suppliers', (req, res) => { 
    res.sendFile(path.join(__dirname, 'view', 'suppliers.html')); 
});
// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/medicines", require("./routes/medicines"));
app.use("/api/sales", require("./routes/sales"));
app.use("/api/suppliers", require("./routes/suppliers"));
app.use("/api/stats", require("./routes/stats"));

// Test route
app.get("/", (req, res) => {
  res.send("Pharmacy Management API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
