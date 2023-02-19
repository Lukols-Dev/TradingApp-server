const { getDocs, collection } = require("firebase/firestore");
const { firestore } = require("../config/firebase.config");

const getDataLearning = async (req, res) => {
  try {
    const collRef = collection(firestore, "LEARNING");
    const learningData = await getDocs(collRef);
    let data = [];
    learningData.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getDataLearning,
};
