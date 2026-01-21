const express = require("express");
const pool = require("../db/connection");
const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM suppliers ORDER BY id DESC");
  res.json(result.rows);
});

// POST
router.post("/", async (req, res) => {
  const { name, phone, email } = req.body;
  const result = await pool.query(
    "INSERT INTO suppliers (name, phone, email) VALUES ($1,$2,$3) RETURNING *",
    [name, phone, email]
  );
  res.status(201).json(result.rows[0]);
});

// PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;

  const result = await pool.query(
    "UPDATE suppliers SET name=$1, phone=$2, email=$3 WHERE id=$4 RETURNING *",
    [name, phone, email, id]
  );
  res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM suppliers WHERE id=$1", [req.params.id]);
  res.json({ message: "Supplier deleted" });
});

module.exports = router;
