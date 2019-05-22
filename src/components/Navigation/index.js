import React from 'react';
import { Link } from "react-router-dom";

import * as ROUTES from '../constants/routes'

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
});

function Navigation(props) {
  const {classes} = props;
  return (
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Company name
          </Typography>
          <Button><Link to={ROUTES.SIGN_IN}>Zaloguj się</Link></Button>
          <Button><Link to={ROUTES.LANDING}>Landing</Link></Button>
          <Button><Link to={ROUTES.HOME}>Strona główna</Link></Button>
          <Button><Link to={ROUTES.ACCOUNT}>Konto</Link></Button>
          <Button><Link to={ROUTES.ADMIN}>Admin</Link></Button>
        </Toolbar>
      </AppBar>
  )
}

export default withStyles(styles)(Navigation);