import axios from "axios";
import { serverURL } from "../App";
import { setUserData } from "../redux/userSlice";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(serverURL + "/api/user/currentuser", {
      withCredentials: true,
    });
    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(error);
  }
};
