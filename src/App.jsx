import "./index.css";
import { useTheme }    from "./hooks/useTheme";
import CustomCursor    from "./components/CustomCursor";
import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import Work            from "./components/Work";
import Projects        from "./components/Projects";
import Skills          from "./components/Skills";
import Baseline        from "./components/Footer";

export default function App() {
  const [dark, toggleDark] = useTheme();

  return (
    <>
      <CustomCursor />
      <Navbar dark={dark} onToggle={toggleDark} />

      <main className="pt-12">
        <Hero />
        <Work />
        <Projects />
        <Skills />
      </main>

      <Baseline />
    </>
  );
}
