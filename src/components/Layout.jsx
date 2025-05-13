import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="pt-[0px] sm:pt-[0px]">
        <Outlet />
      </main>
    </>
  );
}
