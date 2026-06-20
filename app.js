const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

require("./config/db");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
    session({
        store: new SQLiteStore({
            db: "sessions.db",
            dir: "./"
        }),
        secret: "portfolio_secret_key",
        resave: false,
        saveUninitialized: false
    })
);

app.use("/", authRoutes);
app.use("/", portfolioRoutes);

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});