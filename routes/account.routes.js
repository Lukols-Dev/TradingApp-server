const express = require("express");
const {
  getDataUserAccount,
  updateUserAccountData,
  updateSubscriptionID,
  deleteUserAccount,
} = require("../controllers/account.controller");

const routes = express.Router();

//Route for getDataUserAccount
routes.route("/auth/account/:id").get(getDataUserAccount);
//Route for update user data: Name, Emial, Surname
routes.route("/auth/account/id").post(updateUserAccountData);
routes.route("/auth/account/:id").delete(deleteUserAccount);
//Route for updateSubscriptionID
routes.route("/auth/account/update-subscription").post(updateSubscriptionID);

module.exports = {
  routes: routes,
};
