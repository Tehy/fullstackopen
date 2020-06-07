import React from "react";

const Notify = (props) => {
  const type = props.type;
  const msg = props.msg;

  return <p className={type}>{msg}</p>;
};
export default Notify;
