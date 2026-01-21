const express = require("express");
const pool = require("../db/connection");
const router = express.Router();

// GET ALL SALES
router.get("/", async (req, res) => {
  const result = await pool.query(`
    SELECT s.*, m.name AS medicine_name
    FROM sales s
    JOIN medicines m ON s.medicine_id = m.id
    ORDER BY s.sale_date DESC
  `);
  res.json(result.rows);
});

// CREATE SALE
router.post("/", async (req, res) => {
  const { medicine_id, quantity_sold } = req.body;

  // get price
  const med = await pool.query(
    "SELECT price, quantity FROM medicines WHERE id=$1",
    [medicine_id]
  );

  if (med.rows.length === 0)
    return res.status(404).json({ message: "Medicine not found" });

  if (med.rows[0].quantity < quantity_sold)
    return res.status(400).json({ message: "Insufficient stock" });

  const total_price = med.rows[0].price * quantity_sold;

  await pool.query(
    "INSERT INTO sales (medicine_id, quantity_sold, total_price) VALUES ($1,$2,$3)",
    [medicine_id, quantity_sold, total_price]
  );

  // update stock
  await pool.query(
    "UPDATE medicines SET quantity = quantity - $1 WHERE id=$2",
    [quantity_sold, medicine_id]
  );

  res.status(201).json({ message: "Sale recorded successfully" });
});

// DELETE SALE (VOID SALE)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // First, get the sale details to restore stock
    const saleResult = await pool.query(
      "SELECT medicine_id, quantity_sold FROM sales WHERE id = $1",
      [id]
    );
    
    if (saleResult.rows.length === 0) {
      return res.status(404).json({ message: "Sale not found" });
    }
    
    const { medicine_id, quantity_sold } = saleResult.rows[0];
    
    // Restore the stock quantity
    await pool.query(
      "UPDATE medicines SET quantity = quantity + $1 WHERE id = $2",
      [quantity_sold, medicine_id]
    );
    
    // Delete the sale record
    await pool.query("DELETE FROM sales WHERE id = $1", [id]);
    
    res.json({ 
      message: "Sale voided successfully", 
      restored_quantity: quantity_sold,
      medicine_id: medicine_id 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
