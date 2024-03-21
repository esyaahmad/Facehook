const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { hash } = require("../utils/toBcrypt");
const { GraphQLError } = require("graphql");
const user = require("../schemas/user");

const getCollection = () => {
  const db = getDatabase();
  const userCollection = db.collection("User");
  return userCollection;
};

const getUsers = async () => {
  const users = await getCollection()
    .find(
      {},
      {
        projection: {
          password: 0,
        },
      }
    )
    .toArray();

  return users;
};

const getUserById = async (id) => {
  const agg = [
    { $match: { _id: new ObjectId(id) } },
    {
      '$lookup': {
        'from': 'Follows', 
        'localField': '_id', 
        'foreignField': 'followingId', 
        'as': 'follower'
      }
    }, {
      '$lookup': {
        'from': 'User', 
        'localField': 'follower.followersId', 
        'foreignField': '_id', 
        'as': 'followersName'
      }
    }, {
      '$lookup': {
        'from': 'Follows', 
        'localField': '_id', 
        'foreignField': 'followersId', 
        'as': 'following'
      }
    }, {
      '$lookup': {
        'from': 'User', 
        'localField': 'following.followingId', 
        'foreignField': '_id', 
        'as': 'followingsName'
      }
    }
  ];

  const user = await getCollection().aggregate(agg).toArray();
  return user[0];
};

const getUserByEmail = async (email) => {
  const user = await getCollection().findOne({
    email,
  });
  return user;
};

const searchUserByUsername = async (username) => {
  let regex = new RegExp(username);
  const users = await getCollection()
    .find(
      {
        username: {
          $regex: regex,
        },
      },
      {
        projection: {
          password: 0,
        },
      }
    )
    .toArray();
  return users;
};

const addUser = async (payload) => {
  //validate minimum length password
  if (payload.password.length < 5) {
    throw new GraphQLError("Password must contain at least 5 words", {
      extensions: {
        code: "Bad Request",
        http: { status: 400 },
      },
    });
  }

  //validate unique username
  const duplicateUsername = await getCollection().findOne({ username: payload.username });
  if (duplicateUsername) {
    throw new GraphQLError("Username is already taken", {
      extensions: {
        code: "Bad Request",
        http: { status: 400 },
      },
    });
  }

  //validate unique email
  const duplicateEmail = await getCollection().findOne({ email: payload.email });
  if (duplicateEmail) {
    throw new GraphQLError("Email is already taken", {
      extensions: {
        code: "Bad Request",
        http: { status: 400 },
      },
    });
  }

  //validate format email "@mail.com"
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(payload.email);
  if (regex === false) {
    throw new GraphQLError("Invalid Format Email", {
      extensions: {
        code: "Bad Request",
        http: { status: 400 },
      },
    });
  }

  payload.password = hash(payload.password);

  const user = await getCollection().insertOne(payload);
  const newUser = await getCollection().findOne(
    {
      _id: new ObjectId(user.insertedId),
    },
    {
      projection: {
        password: 0,
      },
    }
  );
  return newUser;
};

module.exports = { getUsers, getUserById, getUserByEmail, addUser, searchUserByUsername };
