const { ObjectId } = require("mongodb");
const { createPost, getPostById, getPosts, getCollection } = require("../model/post");
const user = require("./user");
const { Redis } = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

const typeDefs = `#graphql
type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
    author: [User]
}

type PostDetail {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
    author: User
}

type Comments {
    content: String
    username: String
    createdAt: String
    updatedAt: String
}

type Likes {
    username: String
    createdAt: String
    updatedAt: String
}

input NewPost {
    content:String!
    imgUrl:String
    tags:[String]
}
type Query {
    getPosts: [Post]


    findPostById(postId: ID): PostDetail
}

type Mutation {
    addPost(payload: NewPost): Post
    commentPost(id: ID, content:String): Post
    likePost(likePostId:ID): Response
}
`;

const resolvers = {
  Query: {
    getPosts: async (_parent, _args, contextValue) => {
      const loginInfo = await contextValue.auth();
      const posts = await getPosts();
      redis.set("data:posts", JSON.stringify(posts));
      return posts;
    },
    findPostById: async (_parent, args, contextValue) => {
      const loginInfo = await contextValue.auth();
      const post = await getPostById(args.postId);
      console.log(args);
      return post;
    },
  },
  Mutation: {
    addPost: async (_parent, { payload }, contextValue) => {
      const { userId } = await contextValue.auth();
      const post = await createPost({
        content: payload.content,
        tags: payload.tags,
        imgUrl: payload.imgUrl,
        authorId: new ObjectId(userId),
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // console.log(post);
      redis.del("data:posts");
      return post;
    },
    commentPost: async (_parent, args, contextValue) => {
      const { username } = await contextValue.auth();
      console.log(username);
      const { id, content } = args;

      let comment = {
        content,
        username: username,
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      const newComment = await getCollection().updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $addToSet: {
            comments: comment,
          },
        }
      );

      const newCommentPost = await getCollection().findOne({
        _id: new ObjectId(id),
      });

      redis.del("data:posts");

      return newCommentPost;
    },
    likePost: async (_parent, { likePostId }, contextValue) => {
      const { username } = await contextValue.auth();

      const liked = await getCollection().findOne({
        "likes.username": username,
      });

      if (liked) {
        await getCollection().updateOne(
          {
            _id: new ObjectId(likePostId),
          },
          {
            $pull: {
              likes: {
                username,
              },
            },
          }
        );
        return {
          message: "Unliked",
          data: liked,
        };
      } else {
        let like = {
          username,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const newLike = await getCollection().updateOne(
          {
            _id: new ObjectId(likePostId),
          },
          {
            $addToSet: {
              likes: like,
            },
          }
        );

        const newLikePost = await getCollection().findOne({
          _id: new ObjectId(likePostId),
        });

        redis.del("data:posts");

        return {
          message: "Liked Post",
          data: newLikePost,
        };
      }
    },
  },
};

module.exports = {
  postTypeDefs: typeDefs,
  postResolvers: resolvers,
};
