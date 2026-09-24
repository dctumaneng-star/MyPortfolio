import "./index.css";
import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { clearFirstLoad, resetFirstLoad } from "./utils/firstLoad";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import LoadingScreen from "./components/LoadingScreen";

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
  const [dark, toggleDark] = useTheme();
  const [loading, setLoading] = useState(true);

  const handleReboot = () => {
    resetFirstLoad();
    setLoading(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen 
            key="preloader" 
            fullSequence={true}
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
            <Layout dark={dark} onToggle={toggleDark} onReboot={handleReboot}>
              <AnimatedRoutes />
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
