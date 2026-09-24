import "./index.css";
import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { clearFirstLoad } from "./utils/firstLoad";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import LoadingScreen from "./components/LoadingScreen";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
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

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen 
            key="preloader" 
            fullSequence={true}
            onComplete={() => {
              setLoading(false);
              clearFirstLoad();
            }} 
          />
        )}
      </AnimatePresence>

      {!loading && (
        <Layout dark={dark} onToggle={toggleDark}>
          <AnimatedRoutes />
        </Layout>
      )}
    </>
  );
}
