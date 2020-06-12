import axios from "axios";
const baseUrl = "/api/blogs";

const postBlog = async (user, blog) => {
  const request = await axios({
    method: "post",
    url: baseUrl,
    data: blog,
    headers: {
      Authorization: "Bearer " + user,
    },
  });

  return request;
};

export default postBlog;
