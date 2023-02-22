const { getDocs, doc, collection } = require("firebase/firestore");
const { firestore } = require("../config/firebase.config");

//Get positions for one day
const getDayPositions = async (req, res) => {
  const day = req.query.currDay;
  const interval = req.query.interval;
  const operations = [
    "cancel",
    "stop_loss",
    "take_profit",
    "monitoring",
    "trading",
  ];
  let obj = new Object();

  try {
    for (let i = 0; i < operations.length; i++) {
      const items = [];
      const collRef = collection(
        firestore,
        "SUMMARY",
        `${day}`,
        "POSITIONS",
        `${interval}`,
        `${operations[i]}`
      );

      const response = await getDocs(collRef);

      response.forEach((doc) => {
        items.push(doc.data());
      });
      Object.assign(obj, {
        [operations[i]]: response.size,
        [operations[i] + "_items"]: items,
      });
    }

    res.status(200).send(obj);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getDayPositions,
};
