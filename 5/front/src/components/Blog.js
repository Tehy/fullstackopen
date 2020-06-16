import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog, plusLike, user, showDelBtnIfOwner }) => (
  <div>
    {blog.title} <br /> {blog.author}
    <Togglable buttonLabel="view">
      <div className="blog-likes">
        Likes: {blog.likes}{" "}
        <button
          onClick={() => {
            plusLike(blog);
          }}
        >
          like
        </button>{" "}
        <br />
        {blog.url}
      </div>
      {showDelBtnIfOwner(blog, user)}
    </Togglable>
  </div>
);

export default Blog;
