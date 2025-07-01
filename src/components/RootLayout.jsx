import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-[60px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
