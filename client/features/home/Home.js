import React from 'react';
import { useSelector } from 'react-redux';
import AllProducts from '../Allproducts/AllProducts';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <AllProducts/>
    </div>
  );
};

export default Home;
