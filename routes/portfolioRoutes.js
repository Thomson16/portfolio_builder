const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const isLoggedIn = require("../middleware/authMiddleware");

const {
    createPortfolio,
    getLatestPortfolio,
    getAllPortfolios
} = require("../models/portfolioModel");

/* MULTER SETUP */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },

    filename: function(req, file, cb){
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});

const upload = multer({
    storage: storage
});

/* CREATE PORTFOLIO PAGE */
router.get("/create_portfolio", isLoggedIn, (req, res) => {
    res.render("create_portfolio", {
        user: req.session.user
    });
});

/* SAVE PORTFOLIO */
router.post(
    "/create_portfolio",
    isLoggedIn,
    upload.single("photo"),
    (req, res) => {

        const photo = req.file ? req.file.filename : "";

        const data = [
            req.session.user.id,
            req.body.full_name,
            req.body.title,
            req.body.about,
            req.body.skills,
            req.body.education,
            req.body.experience,
            req.body.projects,
            req.body.github,
            req.body.linkedin,
            photo
        ];

        createPortfolio(data, (err) => {
            if (err) {
                return res.send("Database Error: " + err.message);
            }

            res.redirect("/preview");
        });
    }
);

/* PREVIEW */
router.get("/preview", isLoggedIn, (req, res) => {
    getLatestPortfolio(req.session.user.id, (err, portfolio) => {
        if (err) {
            return res.send("Preview Error: " + err.message);
        }

        res.render("preview", {
            user: req.session.user,
            portfolio: portfolio
        });
    });
});

/* GALLERY */
router.get("/gallery", (req, res) => {
    getAllPortfolios((err, portfolios) => {
        if (err) {
            return res.send("Gallery Error: " + err.message);
        }

        res.render("gallery", {
            user: req.session.user,
            portfolios: portfolios
        });
    });
});

module.exports = router;