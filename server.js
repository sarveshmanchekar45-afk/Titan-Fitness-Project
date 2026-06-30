require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.post("/gymMembers", async (req, res) => {

    const { name, email, contact, plan, age } = req.body;

    try {

        await pool.query(
            "INSERT INTO gymMembers(name,email,contact,plan,age) VALUES($1,$2,$3,$4,$5)",
            [name, email, contact, plan, age]
        );

        res.send("Gym Member Saved");

    } catch(err) {

        console.log(err);

        res.send("Database Error");

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
app.get("/gymMembers", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM gymMembers ORDER BY id ASC"
        );

        res.json(result.rows);

    } catch (err) {
        console.log(err);
        res.status(500).send("Database Error");
    }
});