import React from 'react';

import { withFirebase } from "../Firebase";
import Icofont from 'react-icofont';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  icon: {
    marginLeft: '3px',
  }
}));

const SignOutButton = ({ firebase }) => {
  const classes = useStyles();
  return (
    <Fab color="primary" aria-label="Add" className={classes.fab} onClick={firebase.doSignOut}>
      <Icofont icon="sign-out" size="2" className={classes.icon}/>
    </Fab>
  );
};

export default withFirebase(SignOutButton);