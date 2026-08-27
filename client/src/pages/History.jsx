import { useState, useEffect } from "react";
import axios from "axios";
import { serverURL } from "../App";

function History() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(serverURL + "/api/notes/getnotes", {
          withCredentials: true,
        });
        console.log(res.data);
        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };
    myNotes();
  }, []);

  return <div></div>;
}

export default History;
