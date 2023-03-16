import { useState } from "react";
import PropTypes from "prop-types";

const BlogDetails = ({
  blog,
  toggleVisibility,
  updateLikes,
  removeBlog,
  detailsVisibility,
  user,
  blogStyle,
}) => {
  const hideWhenVisible = {
    display: detailsVisibility ? "none" : "",
  };
  const showWhenVisible = {
    display: detailsVisibility ? "" : "none",
  };

  if (user.username !== blog.user.username)
    return (
      <div id="blog">
        <div style={hideWhenVisible}>
          <div style={blogStyle} onClick={toggleVisibility}>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>view</button>
          </div>
        </div>
        <div style={showWhenVisible} className="blogDetails">
          <div style={blogStyle}>
            <div onClick={toggleVisibility}>
              {blog.title} {blog.author}
              <button onClick={toggleVisibility}>view</button>
            </div>
            <div>
              <div>{blog.url}</div>
              <div>
                likes {blog.likes}
                <button onClick={updateLikes}>like</button>
              </div>
              <div>{blog.author}</div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        <div style={blogStyle} onClick={toggleVisibility}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        <div style={blogStyle}>
          <div onClick={toggleVisibility}>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>view</button>
          </div>
          <div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}
              <button onClick={updateLikes}>like</button>
            </div>
            <div>{blog.author}</div>
            <div>
              <button onClick={removeBlog}>remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog = ({ blog, handleLikes, user, deleteBlog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setDetailsVisibility(!detailsVisibility);
  };

  const updateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    handleLikes(updatedBlog);
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog);
  };

  if (!detailsVisibility) {
    return (
      <div style={blogStyle} onClick={toggleVisibility} className="blog">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    );
  }

  return (
    <BlogDetails
      detailsVisibility={detailsVisibility}
      toggleVisibility={toggleVisibility}
      blog={blog}
      updateLikes={updateLikes}
      removeBlog={removeBlog}
      user={user}
      blogStyle={blogStyle}
    />
  );
};

Blog.propTypes = {
  handleLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
