const { getDatabase } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");

const getCollection = () => {
  const db = getDatabase();
  const postCollection = db.collection("Posts");
  return postCollection;
};

const createPost = async (payload) => {
  const newPost = await getCollection().insertOne(payload);
  const post = await getCollection().findOne({
    _id: new ObjectId(newPost.insertedId),
  });
  return post;
};

const getPosts = async () => {
  const agg = [
    {
      '$lookup': {
        'from': 'User', 
        'localField': 'authorId', 
        'foreignField': '_id', 
        'as': 'author'
      }
    }, {
      $project: {
        'author.password': 0,
      }
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];
  const posts = await getCollection().aggregate(agg).toArray();
  return posts;
};

const getPostById = async (id) => {
  const agg = [
    { $match: { _id: new ObjectId(id) } },
    {
      '$lookup': {
        'from': 'User', 
        'localField': 'authorId', 
        'foreignField': '_id', 
        'as': 'author'
      }
    }, {
      '$unwind': {
        'path': '$author', 
        'preserveNullAndEmptyArrays': true
      }
    }
]

    const posts = await getCollection().aggregate(agg).toArray();
  // const post = await getCollection().findOne({
  //   _id: new ObjectId(id),
  // });
  return posts[0]
};

module.exports = {
  createPost,
  getPostById,
  getPosts,
  getCollection,
};
