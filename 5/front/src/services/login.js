import axios from "axios";
const baseUrl = "api/login";

const login = async (userCredentials) => {
  try {
    console.log("loginservice says hello");
    const response = await axios.post(baseUrl, userCredentials);
    console.log("response", response);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("LOGINSERVICE", error);
  }
};

export default { login };
