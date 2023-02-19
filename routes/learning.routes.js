const express = require("express");
const { getDataLearning } = require("../controllers/learning.controller");

const routes = express.Router();

//Route for getDataLearning
routes.route("/auth/learning").get(getDataLearning);

module.exports = {
  routes: routes,
};
