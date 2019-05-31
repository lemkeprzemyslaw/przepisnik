import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomizedSnackbar from "../Snackbars";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const PasswordForget = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  };

  onSubmit = event => {
    const { email, error } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ INITIAL_STATE });
      })
      .catch(() => {
        this.setState({ error })
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email.trim() === '';
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Przypomnij hasło
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Adres email</InputLabel>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                autoComplete="email"
                autoFocus/>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              disabled={isInvalid}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Wyślij przypomnienie
            </Button>
          </form>
        </Paper>
        {error && <CustomizedSnackbar
          variant='error'
          message={error.message}
        />}
      </main>
    );
  }
}

const PasswordForgetLink = () => (
  <Typography align='center'>
    Nie pamiętasz hasła? <Link to={ROUTES.PASSWORD_FORGET}>Przypomnij hasło</Link>
  </Typography>
);

PasswordForget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordForget);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink }