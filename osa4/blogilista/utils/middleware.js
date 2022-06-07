const jwt = require("jsonwebtoken");
const User = require("../models/user");
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const userExtractor = async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      throw "token missing or invalid";
    }
    request.user = await User.findById(decodedToken.id);
  } catch (e) {
    return response.status(401).json({error: "token missing or invalid"});
  }

  next();
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
};

module.exports = {tokenExtractor, userExtractor};
