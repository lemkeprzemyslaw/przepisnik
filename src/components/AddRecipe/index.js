import React from 'react';
import { withFirebase } from '../Firebase';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button'
import {FormControlLabel} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';
import {compose} from 'recompose';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  ingredients: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const INITIAL_STATE = {
  name: '',
  ingredients: '',
  description: '',
  prepareTime: '',
  difficult: '',
  tags: '',
  pub: false
};

class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    ...INITIAL_STATE
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  onSwitchChange = (event) => {
    this.setState({
      [event.target.value]: event.target.checked
    })
  };

  onSubmit = (event) => {
    const {
      name,
      ingredients,
      description,
      prepareTime,
      difficult,
      tags,
      pub } = this.state;

    const userId = this.props.firebase.userId();

    this.props.firebase
      .recipe()
      .set({
        userId,
        name,
        ingredients,
        description,
        prepareTime,
        difficult,
        tags,
        pub
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null })
        }, 6000)
      });


    event.preventDefault();
  };

  render() {
    const {
      name,
      ingredients,
      description,
      prepareTime,
      difficult,
      tags,
      pub } = this.state;

    return (
      <main className={this.props.classes.main}>
        <CssBaseline/>
        <Paper className={this.props.classes.paper}>
          <form onSubmit={this.onSubmit} className={this.props.classes.form}>
            <FormControl variant="outlined" margin="dense" color="primary" fullWidth>
              <InputLabel htmlFor="name">Nazwa dania</InputLabel>
              <OutlinedInput
                id="name"
                name="name"
                value={name}
                onChange={this.onChange}
                required
                autoFocus
              />
            </FormControl>
            <FormControl variant="outlined" margin="dense" className={this.props.classes.ingredients}>
              <InputLabel htmlFor="ingredients">Składniki</InputLabel>
              <OutlinedInput
                id="ingredients"
                name="ingredients"
                value={ingredients}
                onChange={this.onChange}
                required
              />
            </FormControl>
            <FormControl variant="outlined" margin="dense">
              <InputLabel htmlFor="description">Opis</InputLabel>
              <OutlinedInput
                id="description"
                name="description"
                value={description}
                onChange={this.onChange}
                required
              />
            </FormControl>
            <FormControl variant="outlined" margin="dense">
              <InputLabel htmlFor="prepareTime">Czas przygotowania</InputLabel>
              <OutlinedInput
                id="prepareTime"
                name="prepareTime"
                value={prepareTime}
                onChange={this.onChange}
                required
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Poziom trudności
              </InputLabel>
              <Select
                native
                required
                id="difficult"
                name="difficult"
                value={difficult}
                onChange={this.onChange}
                input={
                  <OutlinedInput name="difficult" id="outlined-age-native-simple"/>
                }
              >
                <option value=""/>
                <option value={1}>Student</option>
                <option value={2}>Niedzielny kucharz</option>
                <option value={3}>Kucharz codzienny</option>
                <option value={4}>Master chef</option>
                <option value={5}>Hell's kitchen</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" margin="dense">
              <InputLabel htmlFor="tags">Tagi</InputLabel>
              <OutlinedInput
                id="tags"
                name="tags"
                value={tags}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={pub}
                  onChange={this.onSwitchChange}
                  value="pub"
                  color="primary"
                />
              }
              label={pub ? "Publiczny" : "Niepubliczny"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >Zapisz</Button>
          </form>
        </Paper>
      </main>
  )
  }
}

const AddRecipe = compose(
  withFirebase,
  withStyles(styles)
)(AddRecipeForm);

export default AddRecipe;