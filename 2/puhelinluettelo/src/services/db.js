import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const dbUpdate = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};
const dbUpdatePerson = (id, newPerson) => {
  //console.log("id, newPerson", id, newPerson);
  const request = axios.put(`${baseUrl}/${id.id}`, newPerson);
  //console.log("request", request);
  return request.then((response) => response.data);
};
const dbDelPerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
const dbGetAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { dbUpdate, dbDelPerson, dbGetAll, dbUpdatePerson };
