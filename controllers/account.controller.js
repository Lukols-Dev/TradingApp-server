const { doc, getDoc, updateDoc } = require("firebase/firestore");
const { firestore } = require("../config/firebase.config");

const getDataUserAccount = async (req, res) => {
  try {
    const userID = req.params.id;
    const docRef = doc(firestore, "USERS", `${userID}`);
    const userAccountData = await getDoc(docRef);

    res.status(200).send(userAccountData.data());
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateSubscriptionID = async (req, res) => {
  try {
    const { userID, subscriptionID } = req.body;

    const docRef = doc(firestore, "USERS", `${userID}`);

    const resp = await updateDoc(docRef, {
      subscriptionID: subscriptionID,
    });

    res.status(200).send(resp);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getDataUserAccount,
  updateSubscriptionID,
};
