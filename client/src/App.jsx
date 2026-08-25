import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { getCurrentUser } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
export const serverURL = "http://localhost:8080";

function App() {
  const dispatch = useDispatch();
  // Once we enter it will load and check if the user is auth or not
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
      </Routes>
    </>
  );
}

export default App;
