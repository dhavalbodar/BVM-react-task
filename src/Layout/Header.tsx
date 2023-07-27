import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import {
  Search as SearchIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

const Header: React.FC = () => {
  const handleProfileClick = () => {
    // Handle profile icon click - e.g., open a dropdown menu for logout or other actions
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <div>
          <img src="/path/to/logo.png" alt="Logo" />
        </div>

        {/* Search Bar */}
        <div>
          <div>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            // Add search functionality as needed
          />
        </div>

        {/* Profile Icon */}
        <div>
          <IconButton onClick={handleProfileClick}>
            <img src="/path/to/profile-icon.png" alt="Profile" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
