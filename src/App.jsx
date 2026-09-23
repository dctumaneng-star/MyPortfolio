import "./index.css";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Baseline from "./components/Footer";

export default function App() {
  const [dark, setDark] = useTheme();

  return (
    <>
      <Navbar dark={dark} onToggle={() => setDark((d) => !d)} />

      <main>
        <Hero />
        <Work />
        <Projects />
        <Skills />
        <Education />
      </main>

      <Baseline />
    </>
  );
}
