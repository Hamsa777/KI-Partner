import Header from "./Header";
import { Outlet } from "react-router-dom";
import ChatbotWidget from "./WidgetBot"; // <-- import hinzufügen
//import BackgroundLayer from "./BackgroundLayer"; <BackgroundLayer />


export default function Layout() {
  return (
    <>
      
      <Header />
      <main className="pt-[0px] sm:pt-[0px]">
        <Outlet />
      </main>

      {/* Chatbot unten rechts */}
      <ChatbotWidget />
    </>
  );
}
