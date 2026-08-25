import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import img from "../assets/img_student.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black">
      <Navbar />

      {/* Top */}
      <section className="max-w-7xl mx-auto px-8 pt-25 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
              className="text-5xl lg:text-6xl font-extrabold leading-tight bg-linear-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent"
            >
              Create Smart <br />
              AI Notes in Seconds
            </motion.h1>
            <motion.p
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
              whileHover={{ y: -2 }}
              className="mt-6 max-w-xl text-lg bg-linear-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent"
            >
              Generate exam-focused notes, project documentation, flow diagrams
              and revision-ready content using AI - Faster,cleaner and smarter
            </motion.p>
            <motion.button
              onClick={() => {
                navigate("/notes");
              }}
              whileTap={{ scale: 0.95 }}
              className="
                mt-10 px-10 py-3 rounded-xl
                flex items-center gap-3
                bg-linear-to-r from-[#050505] via-[#172554] to-[#4C1D95]

                border border-white/20
                text-white font-semibold text-lg
                shadow-[0_8px_30px_rgba(99,102,241,0.35)]
              "
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
        {/* Image DIV */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
          className="transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="overflow-hidden">
            <img
              src={img}
              alt="Student Studying"
              style={{ transform: "translateZ(35px)" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Botton */}
      <section className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        <Feature
          icon="📖"
          title="Exam Notes"
          des="High-yield exam oriented notes with revision points."
        />
        <Feature
          icon="📁"
          title="Project Notes"
          des="Well structured content for assignments and projects."
        />
        <Feature
          icon="📊"
          title="Diagrams"
          des="Auto-Generated visual diagrams for clarity."
        />
        <Feature
          icon="⬇️"
          title="PDF Download"
          des="Download clean, printable PDFs instantly."
        />
      </section>
      <Footer />
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
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm font-semibold leading-relate">
          {des}
        </p>
      </div>
    </motion.div>
  );
}

export default Home;
