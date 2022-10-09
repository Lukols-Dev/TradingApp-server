const express = require("express");
const {
  getDataUserAccount,
  updateSubscriptionID,
} = require("../controllers/account.controller");

const routes = express.Router();

//Route for getDataUserAccount
routes.route("/auth/account/:id").get(getDataUserAccount);
//Route for updateSubscriptionID
routes.route("/auth/account/update-subscription").post(updateSubscriptionID);

module.exports = {
  routes: routes,
};
