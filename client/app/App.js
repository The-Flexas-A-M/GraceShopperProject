import React from 'react';
import SideNavBar from '../features/sidenavbar/SideNavBar';
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <SideNavBar/> */}
      <AppRoutes />
    </div>
  );
};

export default App;
