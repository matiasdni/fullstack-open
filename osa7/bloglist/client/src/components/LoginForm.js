import { useState } from "react";
import PropTypes from "prop-types";

export const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    handleSubmit({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
          username
          <input
            type={"text"}
            value={username}
            name={"Username"}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type={"password"}
            value={password}
            name={"Password"}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type={"submit"} id="loginButton">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
