import React, { useState } from "react";
import SideNavBar from "../features/sidenavbar/SideNavBar";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div>
      <Navbar onMenuClick={toggleSideBar} />
      {showSideBar && <SideNavBar />}
      <AppRoutes />
    </div>
  );
};

export default App;
