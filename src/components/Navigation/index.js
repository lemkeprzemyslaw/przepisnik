import React from 'react';
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
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
  return (
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Company name
        </Typography>
        <Button><Link to={ROUTES.LANDING}>Landing</Link></Button>
        <Button><Link to={ROUTES.HOME}>Strona główna</Link></Button>
        <Button><Link to={ROUTES.ACCOUNT}>Konto</Link></Button>
        <Button><Link to={ROUTES.ADMIN}>Admin</Link></Button>
        <SignOutButton/>
      </Toolbar>
    </AppBar>
  )
};

const NavigationNonAuth = () => {
  const classes = useStyles();
  return (
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Company name
          </Typography>
          <Button><Link to={ROUTES.LANDING}>Landing</Link></Button>
          <Button><Link to={ROUTES.SIGN_IN}>Zaloguj się</Link></Button>
        </Toolbar>
      </AppBar>
  )
};

export default Navigation;