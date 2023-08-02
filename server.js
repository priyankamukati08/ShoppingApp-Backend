// app.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const helmet = require("helmet");

const app = express();
app.use(cors());
app.use(helmet());
const port = 3001;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ShoppingAppDatabase",
  password: "password",
  port: 5432, // Default PostgreSQL port
});

app.get("/homepage", async (req, res) => {
  try {
    const client = await pool.connect();
    const { result } = await client.query("SELECT * FROM products");
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
