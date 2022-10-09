const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const { Timestamp, doc, setDoc } = require("firebase/firestore");
const { firebaseAuth, firestore } = require("../config/firebase.config");

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51LNfR6A31XL5oAWCRl5fkHP8lb8M58E5xu8Rncj0oMZWCGbKmyfZrbP3ky4qVERa2g5xvpYXFtqLrXBc2Zd98gSI00AFqyQZo0"
);

// Create new user
const createUserAccount = async (req, res) => {
  try {
    const { email, password, name, surname, terms, newsletter } = req.body;
    let user;
    await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      (userCredential) => {
        user = userCredential.user;
        return user;
      }
    );

    const docRef = doc(firestore, "USERS", user.uid);
    const customer = await stripe.customers.create({
      email: email,
      name: name + " " + surname,
      description: "TradingApp customer",
    });

    if (!!user && !!customer && !!docRef) {
      setDoc(docRef, {
        email: email,
        createAccountTimeStamp: Timestamp.fromDate(new Date()),
        name: name,
        surname: surname,
        uuid: user.uid,
        isDeveloperAccount: false,
        isPossibleToSignIn: false,
        customerID: customer.id,
        terms: terms,
        newsletter: newsletter,
        subscriptionID: "",
      });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Login with email and password
const loginWithEmailPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    await signInWithEmailAndPassword(firebaseAuth, email, password).then(
      (user) => res.status(200).json(user)
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Logout from app User
const logOutFromAccount = async (req, res) => {
  try {
    await signOut(firebaseAuth).then((data) => res.status(200).json(data));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createUserAccount,
  loginWithEmailPassword,
  logOutFromAccount,
};
