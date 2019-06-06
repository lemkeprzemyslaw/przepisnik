import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';

class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: '',
      description: '',
      prepareTime: '',
      difficult: '',
      tags: '',
      pub: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {

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
        <form>
          <FormControl variant="outlined" margin="dense" color="primary">
            <InputLabel htmlFor="name">Nazwa dania</InputLabel>
            <OutlinedInput
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              type="text"
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="description">Opis</InputLabel>
            <OutlinedInput
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
              type="text"
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="prepareTime">Opis</InputLabel>
            <OutlinedInput
              id="prepareTime"
              name="prepareTime"
              value={prepareTime}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="difficult">Opis</InputLabel>
            <OutlinedInput
              id="difficult"
              name="difficult"
              value={difficult}
              onChange={this.handleChange}
              type="text"
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="tags">Składniki</InputLabel>
            <OutlinedInput
              id="tags"
              name="tags"
              value={tags}
              onChange={this.handleChange}
              type="text"
            />
          </FormControl>
          <FormControl variant="outlined" margin="dense">
            <InputLabel htmlFor="pub">Składniki</InputLabel>
            <OutlinedInput
              id="pub"
              name="pub"
              value={pub}
              onChange={this.handleChange}
              type="text"
            />
          </FormControl>
          <Button onSubmit={this.handleSubmit}>Zapisz</Button>
        </form>
      </div>
  )
  }
}

export default AddRecipeForm;