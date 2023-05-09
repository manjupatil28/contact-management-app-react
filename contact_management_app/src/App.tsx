import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import SideBar from "./Components/SideBar";
import AllRoutes from "./Pages/AllRoutes";

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= 768 // Set initial state based on screen size
  );

  const handleTitleClick = () => {
    if (isMobileView) {
      currentRoute === "/charts-and-maps"
        ? window.location.replace("/")
        : window.location.replace("/charts-and-maps");
    }
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768); // Update state on screen size change
  };

  // Attach event listener to window resize
  window.addEventListener("resize", handleResize);

  return (
    <div className="App">
      <h1
        className="z-50 w-full fixed shadow-sm shadow-slate-700 top-0 text-2xl text-white bg-purple-950 p-4"
        onClick={handleTitleClick} // Conditionally render onClick event
        style={isMobileView ? { cursor: "pointer" } : {}}
      >
        {currentRoute !== "/charts-and-maps"
          ? " Contact Management App"
          : "Charts and Maps"}
      </h1>
      <div className="flex w-full ">
        <div className="hidden lg:block sticky  top-0 h-screen">
          <SideBar />
        </div>
        <div className="w-full">
          <AllRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
