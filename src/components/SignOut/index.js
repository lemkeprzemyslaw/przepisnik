import React from 'react';

import { withFirebase } from "../Firebase";
import Icofont from 'react-icofont';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: '3px',
  },
}));

const SignOutButton = ({ firebase }) => {
  const classes = useStyles();
  return (
    <Button onClick={firebase.doSignOut} color='inherit'><Icofont icon="sign-out" size="2" className={classes.icon} />Wyloguj</Button>
  );
};

export default withFirebase(SignOutButton);