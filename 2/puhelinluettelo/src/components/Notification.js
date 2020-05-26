import React, { useEffect } from "react";

const Notification = ({ type, message }) => {
  useEffect(() => {
    const notify = document.querySelector(".notification");
    setTimeout(() => {
      notify.id = "fade";
    }, 10);
  }, []);

  const title =
    type === "error" ? (
      <h2>Error!</h2>
    ) : type === "warning" ? (
      <h2>Alert!</h2>
    ) : type === "success" ? (
      <h2>Success!</h2>
    ) : (
      <h2>Notification!</h2>
    );
  return (
    <notification id={type} className="notification">
      {title}
      <br />
      {message}
    </notification>
  );
};
export default Notification;
