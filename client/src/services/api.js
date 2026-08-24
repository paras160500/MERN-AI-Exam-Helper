import axios from "axios";
import { serverURL } from "../App";

export const getCurrentUser = async () => {
  try {
    console.log("Inside get User");
    const result = await axios.get(serverURL + "/api/user/currentuser", {
      withCredentials: true,
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};
