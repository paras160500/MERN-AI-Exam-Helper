import { motion } from "motion/react";
import logo from "../assets/vite.svg";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Footer() {
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      await axios.get(serverURL + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="z-10 mx-6 mb-6 mt-1 rounded-2xl bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 px-8 py-4 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <motion.div
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="flex flex-col gap-4 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            style={{ transform: "translateZ(20px)" }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
            <span
              style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}
              className="text-lg font-semibold bg-linear-to-br from-white via-gray-300 to-white bg-clip-text text-transparent"
            >
              ExamNotes{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 via-green-300 to-pink-500">
                AI
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-300 max-w-sm">
            ExamNotes AI helps students generate exam focused notes, revision
            material, diagrams and printable PDFs using AI model.
          </p>
        </motion.div>
        <div className="text-center">
          <h1 className="text-sm font-semibold text-white mb-4">Quick Links</h1>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => {
                navigate("/notes");
              }}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Notes
            </li>
            <li
              onClick={() => {
                navigate("/history");
              }}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              History
            </li>
            <li
              onClick={() => {
                navigate("/pricing");
              }}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Add Credits
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h1 className="text-sm font-semibold text-white mb-4">
            Support & Account
          </h1>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => {
                navigate("/auth");
              }}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              SignIn
            </li>
            <li
              onClick={() => {
                handleSignout();
                navigate("/auth");
              }}
              className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              Sign Out
            </li>
            <li
              onClick={() => {
                navigate("/pricing");
              }}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              support@examnotes.com
            </li>
          </ul>
        </div>
      </div>
      <div className="my-6 h-px bg-white/10" />
      <p className="text-center text-gray-500">
        © {new Date().getFullYear()} ExamNotes AI
        <br />
        All rights reserved.
      </p>
    </motion.div>
  );
}

export default Footer;
