import React, { useState } from 'react';
import { List, ListSubheader, ListItemButton,ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const SideNavBar = () => {
    const [ open, setOpen ] = useState(false)

    const handleClick = () => {
        setOpen(!open);
    }
  return (
    <List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
      </ListSubheader>
    }
  >
    <ListItemButton>
      <ListItemText primary="All Products" />
    </ListItemButton>

    <ListItemButton onClick={handleClick}>
      <ListItemText primary="Shop by Genre" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>

    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="RPG" />
        </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Fighting" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Action" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Sports" />
        </ListItemButton>
      </List>
    </Collapse>
  </List>
);
}

export default SideNavBar