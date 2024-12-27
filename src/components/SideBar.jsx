import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { sidebarData } from "../JsonData/sideBarJson";
import MenuIcon from "@mui/icons-material/Menu";
import * as FaIcons from "react-icons/fa";
import logo from "../assests/Ina Logo 270.png";
import "../styles/SideBar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const getIcon = (iconName) => {
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  const toggleSidebar = () => setOpen((prev) => !prev);

  const handleItemClick = (menu, index) => {
    setSelectedIndex(index);
    navigate(menu.route);

    if (isSmallScreen) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const matchingIndex = sidebarData.findIndex(
      (menu) => menu.route === location.pathname
    );
    setSelectedIndex(matchingIndex);
  }, [location.pathname]);

  return (
    <>
      {isSmallScreen && (
        <IconButton onClick={toggleSidebar} className="sidebar-menuIcon sidebar-custom">
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isSmallScreen ? "temporary" : "persistent"}
        anchor="left"
        open={isSmallScreen ? open : true}
        onClose={() => setOpen(false)}
        classes={{
          paper: "sidebar-paper sidebar-custom",
        }}
        className="sidebar-drawer sidebar-custom"
      >
        <img src={logo} alt="logo" className="sidebar-logo sidebar-custom" />

        <List className="sidebar-list">
          {sidebarData.map((menu, index) => (
            <ListItem
              key={menu.title}
              onClick={() => handleItemClick(menu, index)}
              className={`sidebar-listItem ${selectedIndex === index ? "sidebar-listItemSelected sidebar-custom" : ""
                }`}
            >
              <ListItemIcon className="sidebar-listItemIcon sidebar-custom">
                {getIcon(menu.icon)}
              </ListItemIcon>
              <ListItemText
                primary={menu.title}
                className="sidebar-listItemText sidebar-custom"
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
