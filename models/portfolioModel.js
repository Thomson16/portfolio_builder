const db = require("../config/db");

function createPortfolio(data, callback) {
    const sql = `
        INSERT INTO portfolios(
            user_id, full_name, title, about, skills,
            education, experience, projects, github, linkedin, photo
        )
        VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.run(sql, data, callback);
}

function getLatestPortfolio(userId, callback) {
    const sql = `
        SELECT * FROM portfolios
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT 1
    `;

    db.get(sql, [userId], callback);
}

function getAllPortfolios(callback) {
    const sql = "SELECT * FROM portfolios ORDER BY id DESC";

    db.all(sql, [], callback);
}

module.exports = {
    createPortfolio,
    getLatestPortfolio,
    getAllPortfolios
};