const express = require("express");
const { route } = require("express/lib/application");

const {
  getProduct,
  getAllProducts,
  getSubscription,
  deleteSubscription,
  getPrice,
  createCustomer,
  deleteCustomer,
  createCheckoutSession,
  getOrderSessionData,
} = require("../controllers/subscription.controllers");

const routes = express.Router();

//route for add new session stripe
routes.route("/create-session").post(createCheckoutSession);
// route for get session success results
routes.route("/order/success/:id").get(getOrderSessionData);
// route for create new customer
routes.route("/create-customer").post(createCustomer);
// route for delete customer
routes.route("/delete-customer").delete(deleteCustomer);
// route for getProduct
routes.route("/product/:id").get(getProduct);
// route for getAllProducts
routes.route("/products").get(getAllProducts);
// route for getAllProducts
routes.route("/subscription/:id").get(getSubscription);
// route for getPrice
routes.route("/product-price/:id").get(getPrice);
// route for deleteSubscription
routes.route("/delete-subscription/:id").delete(deleteSubscription);

module.exports = {
  routes: routes,
};
