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
  const [loginVisible, setLoginVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notify, setNotify] = useState(null);
  /*   const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState(""); */

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
    if (window.localStorage.getItem("loggedInUser")) {
      console.log("Cookie has user -> ", user);
      setUser(JSON.parse(window.localStorage.getItem("loggedInUser")));
    }
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
    //setBlogs(await blogService.getAll(), "likes");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await loginService.login({
        username: username,
        password: password,
      });
      if (await resp.token) {
        console.log("login SUCCESS");
        console.log("resp", resp);
        setUser(resp);
        window.localStorage.setItem("loggedInUser", JSON.stringify(resp));
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
    //console.log("showDelBtnIfUserOwnsBlog blog", blog);
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
  };

  const showBlogs = () => {
    console.log("blogs", blogs);
    console.log("user", user);
    return blogs.map((blog, i) => (
      <div id="blog" key={i}>
        <Blog blog={blog} />
        <Togglable buttonLabel="view">
          <div>
            Likes: {blog.likes}{" "}
            <button
              onClick={() => {
                plusLike(blog);
              }}
            >
              like
            </button>{" "}
            <br />
            {blog.author}
          </div>
          {showDelBtnIfUserOwnsBlog(blog, user)}
        </Togglable>
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
      console.log("PLUSLIKE blog", blog);
      await blogService.likeBlog(blog);

      const updtBlogs = blogs.map((b) => {
        if (b.id === blog.id) {
          //console.log("OLD b.likes", b.likes);
          b.likes += 1;
          //console.log("NEW b.likes", b.likes);
        }
        return b;
      });
      const sorted = sortByKey(updtBlogs, "likes");
      //console.log("sorted", sorted);
      setBlogs(await sorted); //TODO
      //console.log("PLUSLIKE updtBlogs", updtBlogs);
      //setBlogs(updtBlogs);
    } catch (error) {
      console.log("plusLike error", error);
    }
  };
  //
  return (
    <div>
      {user ? (
        <>
          <p>
            {user.name} logged in
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

export default App;
