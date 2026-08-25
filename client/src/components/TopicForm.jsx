import { motion } from "motion/react";
import { useState } from "react";
import { generateNotes } from "../services/api";

export default function TopicForm({
  setResult,
  setLoading,
  loading,
  setError,
}) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!topic.trim()) {
        setError("Please Enter the Topic.");
        return;
      }
      setError("");
      setLoading(true);
      setResult(null);
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });
      setResult(result.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch nodes from server.");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.75)] p-8 space-y-6 text-white"
    >
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter Topic (e.g. Gravity Law)"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      />
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Class / Level (e.g. Class 10)"
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
      />
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
      />
      <div className="flex flex-col md:flex-row gap-6">
        <Toggle
          label="Exam Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />
        <Toggle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label="Include Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>
      <motion.button
        onClick={handleSubmit}
        whileHover={
          !loading
            ? {
                scale: 1.015,
                y: -2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.30)",
              }
            : {}
        }
        whileTap={!loading ? { scale: 0.98 } : {}}
        disabled={loading}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.7,
        }}
        className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3
    transition-colors duration-300
    ${
      loading
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-linear-to-br from-pink-300 to-green-300 text-black shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
    }`}
      >
        {loading ? "Generating Notes..." : "Generate Notes"}
      </motion.button>
    </motion.div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer select-none"
      onClick={onChange}
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(34,197,94,0.35)"
            : "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ left: checked ? "1.6rem" : "0.25rem" }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        ></motion.div>
      </motion.div>
      <span
        className={`text-sm transition-colors font-semibold ${checked ? "text-green-300" : "text-gray-300"}`}
      >
        {label}
      </span>
    </div>
  );
}
