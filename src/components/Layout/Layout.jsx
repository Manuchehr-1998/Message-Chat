import Sidebar1 from "components/Sidebar1";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <div>
        <Sidebar1 />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
