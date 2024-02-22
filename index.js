const express = require("express");
const app = express();
var cors = require('cors');
const port = 3001;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());
app.use(cors())

// route
app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "Success", res);
});

app.get("/datasekolah", (req, res) => {
  const sql = "SELECT * FROM datasekolah";
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "data sekolah get list", res);
  });
});

app.get("/datasekolah/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM datasekolah WHERE id = ${id}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "get detail sekolah", res);
  });
});

app.post("/datasekolah", (req, res) => {
  const {
    sekolah_tipe,
    sekolah_nama,
    sekolah_alamat,
    sekolah_kpos,
    sekolah_provinsi,
    sekolah_kota,
    sekolah_telp,
    sekolah_email,
    sekolah_facebook,
    sekolah_siswa,
  } = req.body;

  const sql = `INSERT INTO datasekolah (sekolah_tipe, sekolah_nama, sekolah_alamat, sekolah_kpos, sekolah_provinsi, sekolah_kota, sekolah_telp, sekolah_email, sekolah_facebook, sekolah_siswa) VALUES ('${sekolah_tipe}', '${sekolah_nama}', '${sekolah_alamat}', ${sekolah_kpos}, '${sekolah_provinsi}', '${sekolah_kota}', ${sekolah_telp}, '${sekolah_email}', '${sekolah_facebook}', ${sekolah_siswa})`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", err, res);
    if (fields?.affectedRows) {
      const data = {
        id: fields.insertId,
        isSuccess: fields.affectedRows,
        data: req.body,
      };
      response(200, data, "sekolah added successfully", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
