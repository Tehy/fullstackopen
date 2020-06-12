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
        <input onChange={handleUsernameChange} value={name} />
        <br />
        password
        <input onChange={handlePasswordChange} value={password} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default LoginForm;
