import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { getCurrentUser } from "./services/api";
export const serverURL = "http://localhost:8080";

function App() {
  // Once we enter it will load and check if the user is auth or not
  useEffect(() => {
    console.log("I am running....");
    getCurrentUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
