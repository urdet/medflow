const express = require("express");
const pool = require("../db/connection");
const router = express.Router();

// GLOBAL STATS
router.get("/overview", async (req, res) => {
  const medicines = await pool.query("SELECT COUNT(*) FROM medicines");
  const suppliers = await pool.query("SELECT COUNT(*) FROM suppliers");
  const sales = await pool.query("SELECT COUNT(*) FROM sales");
  const revenue = await pool.query(
    "SELECT COALESCE(SUM(total_price),0) as revenue FROM sales"
  );


  res.json({
    total_medicines: medicines.rows[0].count,
    total_suppliers: suppliers.rows[0].count,
    total_revenue: revenue.rows[0].revenue,
    total_sales: sales.rows[0].count
    
  });
});

// EXPIRING MEDICINES
router.get("/expiring", async (req, res) => {
  const result = await pool.query(`
    SELECT name as medicine_name, expiration_date
    FROM medicines
    WHERE expiration_date <= CURRENT_DATE + INTERVAL '30 days'
  `);
  res.json(result.rows);
});

// TOP SELLING MEDICINES
router.get("/top-sales", async (req, res) => {
  const result = await pool.query(`
    SELECT m.name as medicine_name, SUM(s.quantity_sold) AS total_sold
    FROM sales s
    JOIN medicines m ON s.medicine_id = m.id
    GROUP BY m.name
    ORDER BY total_sold DESC
    LIMIT 5
  `);
  res.json(result.rows);
});

module.exports = router;
