const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS turnos (
      id TEXT PRIMARY KEY,
      dia TEXT,
      hora TEXT,
      nombre TEXT,
      telefono TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bloqueados (
      id TEXT PRIMARY KEY
    )
  `);
});

app.get("/turnos", (req, res) => {
  db.all("SELECT * FROM turnos", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.get("/bloqueados", (req, res) => {
  db.all("SELECT * FROM bloqueados", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/turnos", (req, res) => {

  const { id, dia, hora, nombre, telefono } = req.body;

  db.run(
    "INSERT INTO turnos (id, dia, hora, nombre, telefono) VALUES (?, ?, ?, ?, ?)",
    [id, dia, hora, nombre, telefono],
    function(err){
      if(err){
        console.log(err);
        res.status(500).json({ error: err.message });
      }else{
        res.json({ success: true });
      }
    }
  );

});

app.post("/bloquear", (req, res) => {
  const { id } = req.body;

  db.run(
    "INSERT INTO bloqueados (id) VALUES (?)",
    [id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

app.post("/desbloquear", (req, res) => {
  const { id } = req.body;

  db.run("DELETE FROM bloqueados WHERE id = ?", [id]);
  db.run("DELETE FROM turnos WHERE id = ?", [id]);

  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});