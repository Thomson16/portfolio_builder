function isLoggedIn(req, res, next) {
    if (!req.session.user) {
       return res.render("login", {
    error: "Invalid email or password",
    user: req.session.user
});
    }

    next();
}

module.exports = isLoggedIn;

