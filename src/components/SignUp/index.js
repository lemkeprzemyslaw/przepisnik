import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomizedSnackbar from "../Snackbars";

const SignUp = (props) => (
  <div>
    <SignUpForm classes={props.classes} />
  </div>
);

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
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
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doSignUp(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null })
        }, 6000)
      });


    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isValid =
      passwordOne !== passwordTwo ||
      passwordOne.trim() === '' ||
      email.trim() === '' ||
      username.trim() === '';

    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Załóż nowe konto
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Nazwa użytkownika</InputLabel>
              <Input
                id="username"
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                autoComplete="name"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Adres email</InputLabel>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                autoComplete="email"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Hasło</InputLabel>
              <Input
                id="passwordOne"
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Powtórz hasło</InputLabel>
              <Input
                id="passwordTwo"
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              disabled={isValid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Zarejestruj się
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

const SignUpLink = () => (
  <p>
    Nie masz jeszcze konta? <Link to={ROUTES.SIGN_UP}>Zarejestruj się!</Link>
  </p>
);

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default withStyles(styles)(SignUp);

export { SignUpForm, SignUpLink }