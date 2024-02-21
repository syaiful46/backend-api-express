const mysql = require("mysql");

const db = mysql.createConnection({
  host: "blmkdkerrxv24ivuwpzo-mysql.services.clever-cloud.com",
  user: "utlebmltv5som77q",
  password: "NX31hDYYMbMSPL7trfAl",
  database: "blmkdkerrxv24ivuwpzo",
});

module.exports = db
