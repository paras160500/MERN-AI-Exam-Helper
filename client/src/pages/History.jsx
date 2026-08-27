import { useState, useEffect } from "react";
import axios from "axios";
import { serverURL } from "../App";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import pluslogo from "../assets/plus-logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import FinalREsult from "../components/FinalREsult";

function History() {
  const { userData } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const credits = userData?.credits ?? 0;
  const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const openNotes = async (noteId) => {
    setLoading(true);
    try {
      const res = await axios.get(serverURL + `/api/notes/${noteId}`, {
        withCredentials: true,
      });
      setSelectedNote(res.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear from-gray-100 to-gray-200 px-6 py-8">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 rounded-2xl bg-black/80 backdrop-blue-xl border border-white/10 px-8 py-6 items-start flex justify-between md:items-center gap-4 flex-wrap shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
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
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
            className="lg:hidden text-white text-2xl cursor-pointer hover:text-slate-200"
          >
            <GiHamburgerMenu />
          </button>
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
        </div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed lg:static top-0 left-0 z-50 lg:z-auto w-72 lg:w-auto h-full lg:h-[75vh] lg:col-span-1 bg-black/80 lg:bg-black/80 backdrop-blur-xl border border-white/10 p-5 overflow-y-auto shadow-[0_20px_45px_rgba(0,0,0,0.6)] lg:rounded-3xl"
            >
              <button
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                }}
                className="lg:hidden text-white mb-4 cursor-pointer"
              >
                ⬅️ Back
              </button>

              <div className="mb-4 space-y-1">
                <button
                  onClick={() => navigate("/notes")}
                  className="w-full px-3 py-2 rounded-lg font-semibold  text-gray-200 bg-white/10 hover:bg-white/20 text-start text-md"
                >
                  <span className="text-white font-semibold text-xl mr-2">
                    +
                  </span>
                  New Notes
                </button>

                <hr className="border-white/1- mb-4 text-slate-700 mt-2" />

                <h2 className="mb-4 text-lg font-bold">
                  <span className="mr-1">📚</span>
                  <span className="bg-linear-to-r from-green-300 via-yellow-400 to-cyan-200 bg-clip-text text-transparent">
                    Your Notes
                  </span>
                </h2>

                {topics.length === 0 && (
                  <p className="text-sm text-gray-400">No notes created yet</p>
                )}

                <ul className="space-y-3">
                  {topics.map((t, i) => (
                    <li
                      onClick={() => {
                        openNotes(t._id);
                      }}
                      key={i}
                      className="cursor-pointer rounded-xl p-3 bg-white/5 border border-white/10 hover:bg-white/10"
                    >
                      <p className="text-white text-sm font-semibold px-2">
                        {t.topic}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        {t.classLevel && (
                          <span className="px-3 py-2 rounded-full bg-indigo-500/20 text-indigo-300">
                            Class Level : {t.classLevel}
                          </span>
                        )}
                        {t.classLevel && (
                          <span className="px-3 py-2 rounded-full bg-purple-500/20 text-purple-300">
                            Exam Type : {t.examType}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mt-2 text-xs text-gray-300">
                        {t.revisionMode && <span>⚡ Revision</span>}
                        {t.includeDiagram && <span>📊 Diagram</span>}
                        {t.includeChart && <span>📈 Chart</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6 min-h-[75vh]"
        >
          {loading && (
            <p className="text-center text-gray-500">Loading notes...</p>
          )}
          {!loading && !selectedNote && (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a topic from sidebar
            </div>
          )}
          {!loading && selectedNote && <FinalREsult result={selectedNote} />}
        </motion.div>
      </div>
    </div>
  );
}

export default History;
