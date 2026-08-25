import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import pluslogo from "../assets/plus-logo.svg";
import TopicForm from "../components/TopicForm";
import { useState } from "react";

function Notes() {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits ?? 0;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-6 py-8">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
        mb-10
        rounded-2xl
        bg-black/80
        backdrop-blur-xl
        border border-white/10
        px-8 py-6
        shadow-[0_20px_45px_rgba(0,0,0,0.6)]
        flex flex-col md:flex-row
        items-start md:items-center
        justify-between
        gap-4
      "
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-300 via-green-400 to-pink-500 bg-clip-text text-transparent">
            ExamNotes AI
          </h1>

          <p className="text-sm text-slate-300 mt-1 font-semibold">
            AI Powered Exam-Oriented Notes & Revision
          </p>
        </div>

        <div className="flex w-full md:w-auto items-center justify-aroud md:justify-end gap-4">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
          >
            <span className="text-xl">💎</span>

            <span>{credits}</span>

            <motion.span
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              <img className="w-5 h-5" src={pluslogo} alt="Plus logo" />
            </motion.span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="px-4 py-3 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-white hover:bg-white/20 transition flex items-center gap-2"
          >
            📚 Your Notes
          </button>
        </div>
      </motion.header>

      {/* Form */}
      <motion.div className="mg-12">
        <TopicForm
          loading={loading}
          setResult={setResult}
          setLoading={setLoading}
          setError={setError}
        />
      </motion.div>

      {!result && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-15 h-64 rounded-2xl flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg border border-dashed border-gray-300 text-gray-500 shadow-inner"
        >
          <span className="text-4xl mb-3">📘</span>
          <p className="text-sm">Generated notes will appear here</p>
        </motion.div>
      )}
    </div>
  );
}

export default Notes;
