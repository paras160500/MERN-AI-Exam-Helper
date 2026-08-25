import { AnimatePresence, motion } from "motion/react";
import logo from "../assets/vite.svg";
import { useDispatch, useSelector } from "react-redux";
import pluslogo from "../assets/plus-logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverURL } from "../App";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits ?? 0;

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-20 mx-6 mt-6 rounded-2xl bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_22px_55px_rgba(0,0,0,0.75)] flex items-center justify-between px-8 py-4"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="examnotes" className="w-9 h-9" />
        <span className="text-2xl hidden md:block font-semibold text-white">
          ExamNotes
          <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-300 via-green-300 to-pink-500 ml-2">
            AI
          </span>
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6 relative">
        <div className="relative">
          <motion.div
            onClick={() => {
              setShowCredits(!showCredits);
              setshowProfile(false);
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
          >
            <span className="text-xl">{"💎"}</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              <img className="w-5 h-5" src={pluslogo} alt="Plus logo" />
            </motion.span>
          </motion.div>

          {/* Credit popup */}
          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-4 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white"
              >
                <h4 className="font-semibold mb-2">Buy Credits</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Use credits to generate AI notes,diagrams & PDFs.
                </p>
                <button
                  onClick={() => {
                    setShowCredits(false);
                    navigate("/pricing");
                  }}
                  className="w-full py-2 rounded-lg bg-linear-to-r from-blue-300 via-green-300 to-pink-400 text-black font-semibold shadow-[0_4px_20px_rgba(134,239,172,0.15)] transition-all hover:brightness-105 active:scale-[0.98]"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Button */}
        <div className="relative">
          <motion.div
            onClick={() => {
              setshowProfile(!showProfile);
              setShowCredits(false);
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
          >
            <span className="text-xl">
              {userData?.name?.slice(0, 1)?.toUpperCase() || "U"}
            </span>
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-4 w-52 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white"
              >
                <MenuItem
                  text="History"
                  onClick={() => {
                    setshowProfile(false);
                    navigate("/history");
                  }}
                />
                <div className="h-px bg-white/10 mx-3" />
                <MenuItem text="Sign Out" red onClick={() => handleSignout()} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`w-full text-left px-5 py-3 text-sm transition-colors cursor-pointer rounded-xl ${
        red
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-200 hover:bg-white/10"
      }`}
    >
      {text}
    </div>
  );
}

export default Navbar;
