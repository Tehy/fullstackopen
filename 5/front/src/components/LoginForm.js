import React from "react";

const LoginForm = ({
  name,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        username
        <input id="username" onChange={handleUsernameChange} value={name} />
        <br />
        password
        <input id="password" onChange={handlePasswordChange} value={password} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default LoginForm;
