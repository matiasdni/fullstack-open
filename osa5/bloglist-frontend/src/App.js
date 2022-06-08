import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { LoginForm } from "./components/LoginForm";
import { CreateForm } from "./components/CreateForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [createVisible, setCreateVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLikes = async ({ updatedBlog }) => {
    await blogService.update(updatedBlog);
    const newBlogs = [...blogs];
    newBlogs.at(
      blogs.indexOf(blogs.find((blog) => blog.id === updatedBlog.id))
    ).likes += 1;
    setBlogs(newBlogs);
  };

  const notify = (message, type) => {
    if (!type) {
      type = "info";
    }
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      notify("login successful");
    } catch (exception) {
      notify("wrong username or password", "alert");
    }
  };

  const logOutHandler = () => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    setUser(null);
    notify("logout successful");
  };

  const addBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(blog));
      notify(`a new blog ${blog.title} by ${blog.author} added`);
      setCreateVisible(false);
    } catch (e) {
      notify("title or url missing", "alert");
    }
  };

  const createForm = () => {
    const hideWhenVisible = { display: createVisible ? "none" : "" };
    const showWhenVisible = { display: createVisible ? "" : "none" };
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <CreateForm handleSubmit={addBlog} />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const Notification = ({ notification }) => {
    if (notification === null) {
      return null;
    }

    const style = {
      color: notification.type === "alert" ? "red" : "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };

    return <div style={style}>{notification.message}</div>;
  };

  if (user === null)
    return (
      <>
        <Notification notification={notification} />
        <LoginForm handleSubmit={handleLogin} />
      </>
    );

  return (
    <>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={logOutHandler}>logout</button>
      </p>
      {createForm()}
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
        ))}
      </div>
    </>
  );
};

export default App;
