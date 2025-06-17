import Header from "./Header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
// import ChatbotWidget from "./WidgetBot";
// import BackgroundLayer from "./BackgroundLayer";

export default function Layout() {
  return (
    <>
      {/* <BackgroundLayer /> */}

      <Header />
      <main className="pt-[0px] sm:pt-[0px]">
        <Outlet />
      </main>

      {/* <ChatbotWidget /> */}

      <Footer /> {/* <-- Footer ist jetzt immer sichtbar */}
    </>
  );
}
