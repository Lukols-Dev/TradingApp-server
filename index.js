const express = require("express");
const authenticationRoutes = require("./routes/authentication.routes");
const subscriptionRoutes = require("./routes/subscription.routes");
const userAccountRoutes = require("./routes/account.routes");
const summaryRoutes = require("./routes/summary.routes");
const learningRoutes = require("./routes/learning.routes");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/auth/login", (req, res) => {
  res.send({ hello: "jestes w dodawaniu użytkownik" });
});

// Routers endpoints for: Auth
app.use("/api", [
  authenticationRoutes.routes,
  subscriptionRoutes.routes,
  userAccountRoutes.routes,
  learningRoutes.routes,
  summaryRoutes.routes,
]);

// Port where can find app in Localhost
const PORT = process.env.PORT || 5000;

app.listen(PORT);
