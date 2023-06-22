import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import SideNavBar from "../sidenavbar/SideNavBar";
import {useRef} from 'react'


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


const Navbar = ({searchString , setSearchString}) => {
  const inp = useRef();

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            bgcolor: "maroon",
            height: "10vh",
            display: "flex",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <div class="search">
            <input
            ref ={inp}
            onChange={e => e.target.value =='' && setSearchString("")}
           
              type="text"
              placeholder="Search by name, genre, or platform..."
            />
            <button onClick={()=> {setSearchString(inp.current.value), navigate("/allproducts")}} type="submit">Go!</button>
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              fontFamily: "Oswald, sans-serif",
              fontSize: "2.5rem",
            }}
          >
           <Link to="/"><span id="logo">GameWorld</span></Link> 
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to='/cart'>
            <ShoppingCartIcon sx={{ color: "white" }} />
            </Link>
          </IconButton>
          <nav id="login-nav">
            {isLoggedIn ? (
              <div>
                <Link class="signin-up" to="/home">
                  Home
                </Link>
                <button
                  id="logout"
                  type="button"
                  onClick={logoutAndRedirectHome}
                >
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
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)} // This will close the drawer when user clicks outside it
        classes={{ paper: 'drawer-paper' }}
      >
        <SideNavBar setShowSideBar={setDrawerOpen}/>
      </Drawer>
    </Box>
  );
};

export default Navbar;
