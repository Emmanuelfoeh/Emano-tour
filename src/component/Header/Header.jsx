import { AppBar, Box, Toolbar, InputBase, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Autocomplete } from "@react-google-maps/api";
import React from "react";

import useStyles from "./style";

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Tap on the Map to visit your current location on load.
          </Typography>
          {/* <Autocomplete> */}
          {/* <div className={classes.search}>
        <div className={classes.searchIcon}>
            <Search/>
        </div>
        <InputBase placeholder='search...' classes= {{root:classes.inputRoot,input:classes.inputInput}}/>
    </div> */}
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
