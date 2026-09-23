import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Baseline from "./Footer";

export default function Layout({ dark, onToggle, children }) {
  return (
    <>
      <CustomCursor />
      <Navbar dark={dark} onToggle={onToggle} />

      <main className="pt-12 min-h-[calc(100vh-48px)] flex flex-col">
        {children}
      </main>

      <Baseline />
    </>
  );
}

