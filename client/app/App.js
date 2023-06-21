import React, { useState, useEffect } from "react";
import SideNavBar from "../features/sidenavbar/SideNavBar";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import {useDispatch, useSelector} from "react-redux"
import { getProducts } from "../features/Allproducts/productSlice";




const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [searchString, setSearchString]= useState("")
 

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getProducts())
      dispatch(loadGuestCart())
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("guestCart")) {
      localStorage.setItem("guestCart", JSON.stringify([]));
    }
  }, []);




  return (
    <div>
      <Navbar setSearchString={setSearchString} searchString={searchString} onMenuClick={toggleSideBar} />
      {showSideBar && <SideNavBar  setShowSideBar={setShowSideBar}/>}
      <AppRoutes searchString={searchString} setSearchString={setSearchString}/>
    </div>
  );
};

export default App;
