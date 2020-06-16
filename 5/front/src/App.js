import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import CreateNewBlog from "./components/CreateNewBlog";
import loginService from "./services/login";
import postBlogService from "./services/postBlog";
import Notify from "./components/Notify";
import Togglable from "./components/Togglable";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("loggedInUser"))
  );
  const [notify, setNotify] = useState(null);

  const blogFormRef = React.createRef();

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const req = await postBlogService(user.token, blog);
    if (req.status === 200) {
      updateBlogs();
      //clearNewBlogForm();
      displayNotify("success", `Blog "${blog.title}" added!`);
    }
  };

  useEffect(() => {
    //let cookie = window.localStorage.getItem("loggedInUser");
    //console.log("useeffect cookie", cookie);
    //console.log("cookie", cookie);
    //setUser(cookie, loadPage());
    //console.log("Cookie has user -> ", user);
    /* const setCookie = async () => {
      if (window.localStorage.getItem("loggedInUser")) {
        console.log("Cookie has user -> setting user");
        const userCookie = JSON.parse(
          window.localStorage.getItem("loggedInUser")
        );

        setUser(await userCookie);
      }
    }; */
  }, []);
  useEffect(() => {
    updateBlogs();
  }, []);

  const displayNotify = (type, msg) => {
    const notification = <Notify type={type} msg={msg} />;
    setNotify(notification);
    setTimeout(() => {
      setNotify(null);
    }, 4000);
  };
  const sortByKey = (array, key) => {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  };

  const updateBlogs = async () => {
    setBlogs(sortByKey(await blogService.getAll(), "likes"));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await loginService.login({
        username: username,
        password: password,
      });
      if (await resp.token) {
        console.log("logging in user");
        window.localStorage.setItem("loggedInUser", JSON.stringify(resp));
        setUser(resp); // user
        console.log("resp.username", resp.username);

        console.log("handleLogin SETTING COOKIE");
        console.log(
          "COOKIE",
          window.localStorage.getItem("loggedInUser", JSON.stringify(resp))
        );
      } else if (!(await resp.token)) {
        console.log("login FAILED");
        displayNotify("error", "Wrong username or password!");
      }
    } catch (error) {
      displayNotify("error", "Wrong username or password!");
    }
  };
  const logout = () => {
    setUser(null);
    window.localStorage.clear();
  };
  const loginForm = () => {
    return (
      <>
        {notify ? notify : <></>}
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      </>
    );
  };
  const createNewBlogForm = () => {
    return (
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateNewBlog createBlog={addBlog} />
      </Togglable>
    );
  };
  const showDelBtnIfUserOwnsBlog = (blog, user) => {
    //console.log("blog.user.username && user.username", blog.user.username, user.username);
    if (blog.user.username && user.username) {
      //console.log("blog.username", blog.user.username);
      //console.log("user.username", user.username);
      if (blog.user.username === user.username) {
        return (
          <button
            onClick={() => {
              deleteBlog(blog, user);
            }}
          >
            remove
          </button>
        );
      }
    }
  };
  const showBlogs = () => {
    return blogs.map((blog, i) => (
      <div className="blog" key={i}>
        <Blog
          blog={blog}
          plusLike={plusLike}
          user={user}
          showDelBtnIfOwner={showDelBtnIfUserOwnsBlog}
        />
      </div>
    ));
  };
  const deleteBlog = async (blog, user) => {
    console.log("blog, user", blog, user);
    if (window.confirm(`Delete "${blog.title}" ?`)) {
      try {
        await blogService.deleteBlog(blog.id, user.token);
        const updtBlogs = blogs.filter((b) => {
          if (b.id !== blog.id) {
            return b;
          }
        });
        setBlogs(updtBlogs);
      } catch (error) {
        console.log("deleteBlog error", error);
      }
    }
  };
  const plusLike = async (blog) => {
    //blogService.likeBlog(blog, user);
    try {
      console.log("PLUSLIKE blog", blog, user);
      await blogService.likeBlog(blog);

      const updtBlogs = blogs.map((b) => {
        if (b.id === blog.id) {
          b.likes += 1;
        }
        return b;
      });
      const sorted = sortByKey(updtBlogs, "likes");
      setBlogs(await sorted);
    } catch (error) {
      console.log("plusLike error", error);
    }
  };

  const loadPage = () => {
    //console.log("LOADPAGE user", user);
    return (
      <div>
        {user ? (
          <>
            <p>
              {user.username} logged in
              <button onClick={logout}>logout</button>
            </p>{" "}
            {notify ? notify : <></>}
            {createNewBlogForm()}
            {showBlogs()}
          </>
        ) : (
          loginForm()
        )}
      </div>
    );
  };
  return loadPage();
};

export default App;
