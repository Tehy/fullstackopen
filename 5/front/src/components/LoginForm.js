import React, { useState } from "react";
//import loginService from "../services/login";

const LoginForm = ({
  name,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  /* const [name, setName] = useState("");
  const [password, setPassword] = useState(""); */

  /*   const handleOnSubmit = async (e) => {
    e.preventDefault();
    //console.log("handleSubmit says hello");
    //console.log("creds", name, password);
    try {
      const resp = await loginService.login({
        username: name,
        password: password,
      });
      if (resp.token) {
        auth(resp);
      }
    } catch (error) {
      notify("error", "Wrong username or password!");
    }
  }; */
  /*   const handleNameChange = (e) => {
    const newVal = e.target.value;
    setName(newVal);
  };
  const handlePassChange = (e) => {
    const newVal = e.target.value;
    setPassword(newVal);
  };
 */
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