const express = require("express");
const { route } = require("express/lib/application");

const { getDayPositions } = require("../controllers/summary.controllers");

const routes = express.Router();

//route for add new session stripe
routes.route("/summary/day").get(getDayPositions);

module.exports = {
  routes: routes,
};
