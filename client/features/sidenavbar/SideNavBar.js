import React, { useState } from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const SideNavBar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        <ListItemButton>
          <Link to="/allproducts">
            <ListItemText primary="All Products" />
          </Link>
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Shop by Genre" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Link to="/genre/rpg">
                <ListItemText primary="RPG" />
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Link to='/genre/fighting'>
              <ListItemText primary="Fighting" />
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link to='/genre/action'>
              <ListItemText primary="Action" />
              </Link>
            </ListItemButton>
            <ListItemButton>
            <Link to='/genre/sports'>
              <ListItemText primary="Sports" />
              </Link>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default SideNavBar;
