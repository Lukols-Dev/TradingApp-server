const config = require("../config/keys");
const Stripe = require("stripe");
const stripe = Stripe(config.stripeSecred);

const createCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: "lukaszolszewski96@gmail.com",
      name: "Łukasz Olszewski",
      description: "",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const { priceID, customerID } = req.body;
    const session = await stripe.checkout.sessions.create({
      customer: customerID,
      success_url: `${config.frontendURL}/order/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.frontendURL}`,
      line_items: [{ price: priceID, quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
    });
    res.status(200).send(session.id);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOrderSessionData = async (req, res) => {
  try {
    const sessionID = req.params.id;
    const session = await stripe.checkout.sessions.retrieve(`${sessionID}`);

    res.status(200).send(session);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deleted = await stripe.customers.del("cus_M9tIc6gxemdzFl");
    res.status(200).send(deleted);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await stripe.products.retrieve(`${productID}`);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await stripe.products.list();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPrice = async (req, res) => {
  try {
    const priceID = req.params.id;
    const price = await stripe.prices.retrieve(`${priceID}`);
    res.status(200).send(price);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getSubscription = async (req, res) => {
  const subscriptionID = req.params.id;
  try {
    const subscription = await stripe.subscriptions.retrieve(
      `${subscriptionID}`
    );
    res.status(200).send(subscription);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteSubscription = async (req, res) => {
  const subscriptionID = req.params.id;
  try {
    const deleted = await stripe.subscriptions.del(`${subscriptionID}`);
    res.status(200).send(deleted);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getProduct,
  getAllProducts,
  getSubscription,
  getPrice,
  deleteSubscription,
  createCustomer,
  createCheckoutSession,
  getOrderSessionData,
  deleteCustomer,
};
