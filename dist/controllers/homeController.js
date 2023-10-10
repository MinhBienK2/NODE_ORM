"use strict";
const getHomePage = (req, res) => {
    return res.render('homepage.ejs');
};
const getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};
module.exports = { getHomePage, getAboutPage };
