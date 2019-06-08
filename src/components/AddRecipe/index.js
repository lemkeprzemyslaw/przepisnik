import React from 'react';
import { withFirebase } from '../Firebase';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button'
import {FormControlLabel} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';

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

    event.preventDefault();
    const userId = this.props.firebase.userId();

    this.props.firebase
      .recipe(userId)
      .set({
        name,
        ingredients,
        description,
        prepareTime,
        difficult,
        tags,
        pub
      })
      .then(() => {
        console.log('dupa');
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
      <div>
        <form onSubmit={this.onSubmit}>
          <FormControl variant="outlined" margin="dense" color="primary">
            <InputLabel htmlFor="name">Nazwa dania</InputLabel>
            <OutlinedInput
              id="name"
              name="name"
              value={name}
              onChange={this.onChange}
              type="text"
              autoFocus
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="ingredients">Składniki</InputLabel>
            <OutlinedInput
              id="ingredients"
              name="ingredients"
              value={ingredients}
              onChange={this.onChange}
              type="text"
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="description">Opis</InputLabel>
            <OutlinedInput
              id="description"
              name="description"
              value={description}
              onChange={this.onChange}
              type="text"
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="prepareTime">Czas przygotowania</InputLabel>
            <OutlinedInput
              id="prepareTime"
              name="prepareTime"
              value={prepareTime}
              onChange={this.onChange}
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
                <OutlinedInput name="difficult" id="outlined-age-native-simple" />
              }
            >
              <option value="" />
              <option value={1}>Student</option>
              <option value={2}>Niedzielny kucharz</option>
              <option value={3}>Kucharz codzienny</option>
              <option value={4}>Master chef</option>
              <option value={5}>Hell's kitchen</option>
            </Select>
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="difficult">Poziom trudności</InputLabel>
            <OutlinedInput
              id="difficult"
              name="difficult"
              value={difficult}
              onChange={this.onChange}
              type="text"
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="tags">Tagi</InputLabel>
            <OutlinedInput
              id="tags"
              name="tags"
              value={tags}
              onChange={this.onChange}
              type="text"
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
          >Zapisz</Button>
        </form>
      </div>
  )
  }
}

const AddRecipe = withFirebase(AddRecipeForm);

export default AddRecipe;