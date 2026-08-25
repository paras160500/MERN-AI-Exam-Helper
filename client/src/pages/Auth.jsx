import { signInWithPopup } from "firebase/auth";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function Auth() {
  const dispatch = useDispatch();
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const User = response.user;
      const name = User.displayName;
      const email = User.email;
      const result = await axios.post(
        serverURL + "/api/auth/google",
        { name, email },
        {
          withCredentials: true,
        },
      );
      dispatch(setUserData(result.data.user));
    } catch (error) {
      console.log("Google Error : ", error);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-black px-8">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blue-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
      >
        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-300 via-green-400 to-pink-500 bg-clip-text  text-transparent">
          ExamNotes AI
        </h1>

        <p className="text-sm text-slate-300 mt-1 font-semibold">
          AI Powered Exam-Oriented Notes & Revision
        </p>
      </motion.header>

      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-6xl font-extrabold leading-tight bg-linear-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent">
            Unlock Smart <br />
            AI Notes
          </h1>
          <motion.button
            whileHover={{ y: -3, rotateY: -8, scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mt-10 px-10 py-3 rounded-xl flex items-center gap-3
            bg-linear-to-br from-black/90 via-black/80 to-black/90
            border border-white/10
            text-white font-semibold text-lg
            shadow-[0_8px_25px_rgba(0,0,0,0.35)]"
            onClick={handleGoogleAuth}
          >
            <FcGoogle size={22} /> Continue with Google
          </motion.button>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Get{" "}
            <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-violet-600 to-pink-500">
              50 FREE credits
            </span>{" "}
            to create exam notes, project notes, charts, graphs, and clean
            downloadable PDFs all powered by{" "}
            <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 from-0% via-blue-500 via-50% to-violet-600 to-100%">
              AI
            </span>
            .
          </p>

          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-base font-medium text-gray-500">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              50 free credits
            </span>

            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              Upgrade anytime
            </span>

            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              Instant access
            </span>
          </p>
        </motion.div>

        {/* RIGHT CONTENT */}
        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start"
        >
          <Feature
            icon="🎁"
            title="50 Free Credits"
            des="Get 50 free credits to start creating powerful AI-powered notes."
          />

          <Feature
            icon="📚"
            title="Exam Notes"
            des="Generate exam-focused notes for faster learning and revision."
          />

          <Feature
            icon="📊"
            title="Charts & Graphs"
            des="Turn complex topics into clear charts and graphs for easier understanding."
          />

          <Feature
            icon="⬇️"
            title="Free PDF Download"
            des="Download your notes as clean, ready-to-use PDFs anytime, completely free."
          />
        </motion.div>
      </main>
    </div>
  );
}

function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -3, rotateY: -8, scale: 1.07 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative rounded-2xl p-6 bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blue-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relate">{des}</p>
      </div>
    </motion.div>
  );
}
