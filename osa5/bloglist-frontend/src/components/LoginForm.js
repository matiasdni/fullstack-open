import { useState } from "react";

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
          />
        </div>
        <div>
          password
          <input
            type={"password"}
            value={password}
            name={"Password"}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type={"submit"}>login</button>
      </form>
    </div>
  );
};