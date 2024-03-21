const { GraphQLError } = require("graphql");
const { verifyToken } = require("./jwt");
const { getUserById } = require("../model/user");

const authentication = async (req) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  const decodedToken = verifyToken(token);
  // console.log(decodedToken);
  const user = await getUserById(decodedToken.id);
  // console.log(user);
  if (!user) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  // console.log(user.username);
  return {
    userId: user._id,
    username: user.username,
    email: user.email,
  };
};
module.exports = authentication;
