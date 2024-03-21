const { ObjectId } = require("mongodb");
const { getCollection } = require("../model/follow");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
type Follow {
    _id: ID
    followingId: ID
    followersId: ID
    createdAt: String
    updatedAt: String

}

type Response {
    message: String
    data: Follow
}

type Mutation {
    follow(followingId:ID): Response
}
`;
const resolvers = {
  Mutation: {
    follow: async (_parent, { followingId }, contextValue) => {
      const { userId } = await contextValue.auth();
      const followed = await getCollection().findOne({
        followingId: new ObjectId(followingId),
        followersId: new ObjectId(userId),
      });

      if (followed) {
        await getCollection().deleteOne({
          followingId: new ObjectId(followingId),
          followersId: new ObjectId(userId),
        });
        return {
          message: "Unfollowed",
          data: followed,
        };
      } else {
        const follow = await getCollection().insertOne({
          followingId: new ObjectId(followingId),
          followersId: new ObjectId(userId),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const newFollow = await getCollection().findOne({
          _id: follow.insertedId,
        });
        return {
          message: "success following",
          data: newFollow,
        };
      }
    },
  },
};

module.exports = {
  followTypeDefs: typeDefs,
  followResolvers: resolvers,
};
