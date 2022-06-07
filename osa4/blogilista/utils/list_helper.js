const User = require("../models/user");
const Blog = require("../models/blog");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (previousMax, currentBlog) => {
    if (previousMax.likes < currentBlog.likes) {
      return currentBlog;
    } else {
      return previousMax;
    }
  };
  return blogs.reduce(reducer, { likes: 0 });
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  usersInDb,
};
