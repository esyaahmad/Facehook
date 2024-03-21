const { getUsers, getUserById, getUserByEmail, addUser, searchUserByUsername } = require("../model/user");
const { signToken } = require("../utils/jwt");
const { compare } = require("../utils/toBcrypt");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String
    }

type UserProfile {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String
    follower: [Follow]
    followersName: [User]
    following: [Follow]
    followingsName: [User]
    }

type ResponseLogin {
    token: String
    }

input RegisterInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

type Query {
    getUsers: [User]
    getUserById(userId :ID): UserProfile
    searchByUsername(username: String): [User]
}

type Mutation {
    register(payload: RegisterInput): User
    login(email: String!, password: String!): ResponseLogin
}
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await getUsers();
      return users;
    },
    getUserById: async (_parent, args, contextValue) => {
      const { userId } = await contextValue.auth();

      const user = await getUserById(userId);
      return user;
    },
    searchByUsername: async (_parent, args) => {
      const user = await searchUserByUsername(args.username);
      return user;
    },
  },
  Mutation: {
    register: async (_parent, args) => {
      const { payload } = args;
      const newUser = await addUser(payload);
      return newUser;
    },
    login: async (_parent, args) => {
      const { email, password } = args;

      const user = await getUserByEmail(email);
      if (!user) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const isValidPassword = compare(password, user.password);
      if (!isValidPassword) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
      };

      const token = signToken(payload);
      return { token };
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
