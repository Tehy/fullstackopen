import React from "react";
const Blog = ({ blog }) => (
  <div>
    {blog.title} <br /> {blog.url}
  </div>
);

export default Blog;
