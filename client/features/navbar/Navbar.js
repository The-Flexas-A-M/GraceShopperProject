import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (

    <Box
      sx={{ 
        flexGrow: 1 
      }}>
      <AppBar position="static">
        <Toolbar
          sx={{bgcolor: 'maroon',
          height: '10vh',
          display: 'flex',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <div class="search">
            <input type="text" placeholder="Search by name, genre, or platform..." />
            <button type="submit">Go!</button>
          </div>
          <Typography variant="h6" component="div" 
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center', 
            fontFamily: 'Oswald, sans-serif',
            fontSize: '2.5rem',
          }}
          >
            GameWorld
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <nav id="login-nav">
            {isLoggedIn ? (
              <div>
                <Link class="signin-up" to="/home">Home</Link>
                <button id="logout" type="button" onClick={logoutAndRedirectHome}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link class="signin-up" to="/login">Login</Link>
              </div>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
