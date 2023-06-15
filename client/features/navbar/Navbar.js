import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
// import { Search } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

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
          // justifyContent: 'space-between',
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
                <Link class="signin-up" to="/signup">Sign Up</Link>
              </div>
            )}
          </nav>
            {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>


    // <div class="flex bg-red-800 h-[10vh] justify-between">
    //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
    //     <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    //   </svg>

    //   <div>
    //     <input class="h-[50%]" type="text" placeholder="Search.."/>
    //     <button type="button" class="h-[50%] bg-slate-300">Search</button>
    //   </div>
    //   <h1 class="">GameWorld</h1>
    //   <nav>
    //     {isLoggedIn ? (
    //       <div>
    //         <Link to="/home">Home</Link>
    //         <button type="button" onClick={logoutAndRedirectHome}>
    //           Logout
    //         </button>
    //       </div>
    //     ) : (
    //       <div>
    //         <Link to="/login">Login</Link>
    //         <Link to="/signup">Sign Up</Link>
    //       </div>
    //     )}
    //   </nav>
    //   <hr />
    // </div>
  );
};

export default Navbar;
