import React, { useState } from "react";

const CreateNewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={addBlog}>
        title
        <input onChange={({ target }) => setTitle(target.value)} />
        <br />
        author
        <input onChange={({ target }) => setAuthor(target.value)} />
        <br />
        url
        <input onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type="submit">Create Blog</button>
      </form>
    </>
  );
};
export default CreateNewBlog;
