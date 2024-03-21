const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

const getCollection = () => {
  const db = getDatabase();
  const followCollection = db.collection("Follows");
  return followCollection;
};

module.exports = { getCollection };
