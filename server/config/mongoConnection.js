require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = "GC01";
let database;

async function mongoConnect() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to MongoDB Server");
    database = client.db(dbName); // harus ke passing value db ini ke setiap schema
    const userCollection = database.collection("User");

    //test baca data table User
    // const users = await userCollection.find().toArray()
    // console.log(users);

    ///test nambah data,
    // const newProduct = await userCollection.insertOne({
    //   name: "haha",
    //   username: "esyaahmad",
    //   email: "esya@mail.com",
    //   password: "123456",
    // });
    // console.log(newProduct, "<<< new product");

    // console.log(database, "<<< database di mongoConnect");
    return database;
    // return "done";
  } catch (error) {
    console.log(error, "<<< error");
    throw error;
  }
}

function getDatabase() {
  return database;
}

// mongoConnect(); //uncomment kalo mau teset connect

module.exports = {
  mongoConnect,
  getDatabase,
};
