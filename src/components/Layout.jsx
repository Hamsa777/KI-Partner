import Header from "./Header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#010d21]
        to-[#000000]
        text-white
      "
    >
      <Header />

      <main className="pt-[0px] sm:pt-[0px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
