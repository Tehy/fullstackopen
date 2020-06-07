import React, { useState } from "react";
import postBlogService from "../services/postBlog";

const CreateNewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const clearInputs = () => {
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  //console.log("createnewblog props.user", props.user);
  const handleOnSubmitBlog = async (e) => {
    e.preventDefault();
    //console.log("CreateNewBlog submitting");
    try {
      const blog = {
        title: title,
        author: author,
        url: url,
      };
      //console.log("CreateNewBlog user blog", props.user, blog);
      const req = await postBlogService(props.user, blog);
      //console.log("req", req);
      if (req.status === 200) {
        props.updateBlogs();
        clearInputs();
        props.notify("success", `Blog "${title}" added!`);
      }
    } catch (error) {
      console.log("CreateNewBlog", error);
      clearInputs();
      props.notify("error", `Something went wrong :(`);
    }
  };
  const handleTitleChange = (e) => {
    const newVal = e.target.value;
    setTitle(newVal);
  };
  const handleAuthorChange = (e) => {
    const newVal = e.target.value;
    setAuthor(newVal);
  };
  const handleUrlChange = (e) => {
    const newVal = e.target.value;
    setUrl(newVal);
  };

  return (
    <>
      <form onSubmit={handleOnSubmitBlog}>
        title
        <input onChange={handleTitleChange} value={title} required />
        <br />
        author
        <input onChange={handleAuthorChange} value={author} required />
        <br />
        url
        <input onChange={handleUrlChange} value={url} required />
        <br />
        <button type="submit">Create Blog</button>
      </form>
    </>
  );
};
export default CreateNewBlog;
