import React from 'react';
import {Link} from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from '../../constants/routes'
import {AuthUserContext} from '../Session'

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  body: {
    backgroundColor: theme.palette.common.black,
  },
  menu: {
    color: '#2196f3',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
  root: {
    flexGrow: 1,
  },
  toolbarTitle: {
    flex: 1,
  }
}));

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth/> : <NavigationNonAuth/>
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Moje przepisy
        </Typography>
        <Button color="inherit"><Link to={ROUTES.LANDING} className={classes.link}>Landing</Link></Button>
        <Button color="inherit"><Link to={ROUTES.HOME} className={classes.link}>Strona główna</Link></Button>
        <div>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            className={classes.menu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><Link to={ROUTES.ACCOUNT} className={classes.link}>Konto</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to={ROUTES.ADMIN} className={classes.link}>Admin</Link></MenuItem>
          </Menu>
        </div>
        <SignOutButton/>
      </Toolbar>
    </AppBar>
  )
};

const NavigationNonAuth = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Company name
        </Typography>
        <Button color="inherit"><Link to={ROUTES.LANDING} className={classes.link}>Landing</Link></Button>
        <Button color="inherit"><Link to={ROUTES.SIGN_IN} className={classes.link}>Zaloguj się</Link></Button>
      </Toolbar>
    </AppBar>
  )
};

export default Navigation;