import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getSingle = async (id) => {
  return getResponseData(axios.get(`${baseUrl}/${id}`));
};
const getAll = async () => {
  return getResponseData(axios.get(baseUrl));
};
const create = async (anecdote) => {
  return getResponseData(axios.post(baseUrl, anecdote));
};
const update = async (anecdote) => {
  return getResponseData(axios.put(`${baseUrl}/${anecdote.id}`, anecdote));
};
const getResponseData = async (response) => {
  const response = await response;
  return response.data;
};

export default { getAll, getSingle, create, update };
