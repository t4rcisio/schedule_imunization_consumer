/*

-> Main layout

*/

import { Outlet } from "react-router-dom";
import NavBar from "./navs/navbar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
