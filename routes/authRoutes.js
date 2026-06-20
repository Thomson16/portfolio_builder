const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { createUser, findUserByEmail } = require("../models/userModel");
const isLoggedIn = require("../middleware/authMiddleware");

router.get("/", (req, res) => {
    res.render("index", {
        user: req.session.user
    });
});

router.get("/register", (req, res) => {
    res.render("register", {
        error: null,
        user: req.session.user
    });
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(name, email, hashedPassword, (err) => {
        if (err) {
            return res.render("register", {
                error: "Email already exists",
                user: req.session.user
            });
        }

        res.redirect("/login");
    });
});

router.get("/login", (req, res) => {
    res.render("login", {
        error: null,
        user: req.session.user
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email, async (err, user) => {

        if (err || !user) {
            return res.render("login", {
                error: "Invalid Email or Password",
                user: req.session.user
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.render("login", {
                error: "Invalid Email or Password",
                user: req.session.user
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        res.redirect("/dashboard");
    });
});

router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard", {
        user: req.session.user
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;