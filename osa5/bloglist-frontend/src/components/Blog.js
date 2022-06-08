import { useState } from "react";

const Blog = ({ blog, handleLikes, user, deleteBlog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);

  const hideWhenVisible = {
    display: detailsVisibility ? "none" : "",
  };
  const showWhenVisible = {
    display: detailsVisibility ? "" : "none",
  };

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

  if (user.username !== blog.user.username)
    return (
      <div>
        <div style={hideWhenVisible}>
          <div style={blogStyle} onClick={toggleVisibility}>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>view</button>
          </div>
        </div>
        <div style={showWhenVisible}>
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
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle} onClick={toggleVisibility}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
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

export default Blog;
