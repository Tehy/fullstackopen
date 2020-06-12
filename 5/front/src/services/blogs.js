import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  //console.log("axios getting blogs");
  const request = await axios.get(baseUrl);
  return request.data;
};
const likeBlog = async (blog) => {
  //console.log("axios updating likes");
  let { title, author, likes, url, id } = blog;
  const newLikes = likes + 1;
  likes = newLikes;
  await axios({
    method: "put",
    url: baseUrl + "/" + id,
    data: { title, author, likes, url },
  });
};
const deleteBlog = async (blogId, userToken) => {
  /* console.log("axios deleting blog");
  console.log("blogId", blogId);
  console.log("userToken", userToken); */
  const request = await axios({
    method: "delete",
    url: baseUrl + "/" + blogId,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  console.log("request.data", request.data);
};

export default { getAll, likeBlog, deleteBlog };
