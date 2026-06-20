const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("SQLite database connected");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS portfolios(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      full_name TEXT,
      title TEXT,
      about TEXT,
      skills TEXT,
      education TEXT,
      experience TEXT,
      projects TEXT,
      github TEXT,
      linkedin TEXT,
      photo TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;