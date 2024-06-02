import { MdOutlineMenuOpen } from "react-icons/md";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { Link } from "react-router-dom";

function NavBar() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

    return (
      <>
       <div className="">
       <div className="container mx-auto">
       <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
    <MdOutlineMenuOpen className="text-2xl" onClick={toggleDrawer(true)}/>
    <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  </div>
  <div className="navbar-center">
    <Link to='/' className="btn btn-ghost text-2xl"><GiTwoCoins className="text-yellow-500 text-3xl"/> TaskTreasure</Link>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost">
    <a href="https://youtu.be/7uF05BuweRA?si=z9sTt3T3TnBXe8iJ" target="_blank">Watch Demo</a>
    </button>
    <Link to="/login"><button className="btn btn-ghost">
      Login
    </button></Link>
    <Link to="/register">
    <button className="btn btn-ghost">
      Register
    </button>
    </Link>
  </div>
</div>
       </div>
       </div>
      </>
    )
  }
  
  export default NavBar