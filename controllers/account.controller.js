const {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
} = require("firebase/firestore");
const { deleteUser, getAuth } = require("firebase/auth");
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

const getDataUserAccounts = async (req, res) => {
  try {
    const userID = req.params.id;
    const docRef = collection(firestore, "USERS");
    const userAccountData = await getDocs(docRef);
    userAccountData.forEach((doc) => {
      console.log(doc.data());
    });
    // res.status(200).send(userAccountData.data());
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getDB = async (req, res) => {
  try {
    const userID = req.params.id;
    console.log(firestore);
    // res.status(200).send(userAccountData.data());
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUserAccountData = async (req, res) => {
  const { userID, name, surname } = req.body;

  try {
    const docRef = doc(firestore, "USERS", `${userID}`);

    const resp = await updateDoc(docRef, {
      name: name,
      surname: surname,
    });

    res.status(200).send(resp);
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

const deleteUserAccount = async (req, res) => {
  const userID = req.params.id;

  try {
    const auth = await getAuth();
    const docRef = doc(firestore, "USERS", `${userID}`);
    await deleteDoc(docRef);
    const deleteAccountStatus = await deleteUser(auth.currentUser);
    res.status(200).send(deleteAccountStatus);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getDataUserAccount,
  updateUserAccountData,
  updateSubscriptionID,
  deleteUserAccount,
  getDataUserAccounts,
  getDB,
};
