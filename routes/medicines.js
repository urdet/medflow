const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// Get all medicines
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM medicines ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get a single medicine by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM medicines WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new medicine
router.post("/", async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      quantity,
      expiration_date,
      supplier_id
    } = req.body;

    const result = await pool.query(
      `INSERT INTO medicines
       (name, category, price, quantity, expiration_date, supplier_id)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [name, category, price, quantity, expiration_date, supplier_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a medicine
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      price,
      quantity,
      expiration_date,
      supplier_id
    } = req.body;

    const result = await pool.query(
      `UPDATE medicines
       SET name=$1, category=$2, price=$3,
           quantity=$4, expiration_date=$5, supplier_id=$6
       WHERE id=$7
       RETURNING *`,
      [name, category, price, quantity, expiration_date, supplier_id, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a medicine
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM medicines WHERE id=$1", [id]);
    res.json({ message: "Medicine deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
