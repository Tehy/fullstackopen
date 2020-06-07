import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import CreateNewBlog from "./components/CreateNewBlog";
import Notify from "./components/Notify";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notify, setNotify] = useState(null);

  const displayNotify = (type, msg) => {
    const notification = <Notify type={type} msg={msg} />;
    setNotify(notification);
    setTimeout(() => {
      setNotify(null);
    }, 4000);
  };

  useEffect(() => {
    if (window.localStorage.getItem("loggedInUser")) {
      setUser(JSON.parse(window.localStorage.getItem("loggedInUser")));
    }
  }, []);
  const updateBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const loginAuth = (user) => {
    setUser(user);
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));

    //console.log("user", user);
    //console.log("window.localStorage.getItem", window.localStorage);
  };

  useEffect(() => {
    updateBlogs();
  }, []);

  return (
    <div>
      {!user ? (
        <>
          {notify !== null ? notify : null}
          <LoginForm auth={loginAuth} notify={displayNotify} />
        </>
      ) : (
        <>
          {" "}
          <p>User {user.username} logged in</p>{" "}
          <button
            onClick={() => {
              setUser(null);
              window.localStorage.clear();
            }}
          >
            Log out
          </button>
          <br />
          <br />
          {notify !== null ? notify : null}
          <CreateNewBlog
            user={user}
            updateBlogs={updateBlogs}
            notify={displayNotify}
          />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
