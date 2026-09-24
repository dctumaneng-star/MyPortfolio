import "./index.css";
import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { clearFirstLoad } from "./utils/firstLoad";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import LoadingScreen from "./components/LoadingScreen";
import AmbientBackground from "./components/AmbientBackground";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const location = useLocation();
  const [dark, toggleDark] = useTheme();
  const [loading, setLoading] = useState(true);



  return (
    <>
      <AmbientBackground dark={dark} />
      <AnimatePresence>
      {loading ? (
        <LoadingScreen 
          key="preloader" 
          fullSequence={location.pathname === "/"}
          onComplete={() => {
            setLoading(false);
            clearFirstLoad();
          }} 
        />
      ) : (
        <motion.div
          key="layout"
          exit={{ opacity: 0, scale: 0.9, filter: "brightness(0)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Layout dark={dark} onToggle={toggleDark}>
            <AnimatedRoutes />
          </Layout>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
