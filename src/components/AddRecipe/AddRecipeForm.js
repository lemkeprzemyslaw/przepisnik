import React from 'react';
import ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class AppRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: '',
      description: '',
      time: '',
      difficult: '',
      tags: '',
      public: false
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
    return (
      <div>
        <form>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">Nazwa dania</InputLabel>
            <OutlinedInput
              id="name"
              onChange={this.handleChange}
              labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
            />
          </FormControl>

          <label htmlFor="name">Nazwa dania</label>
          <input type="text" id="name" onChange={this.handleChange}/>

          <label htmlFor="name">Składniki</label>
          <input type="text" id="ingredients" onChange={this.handleChange}/>

          <label htmlFor="name">Opis</label>
          <textarea type="text" id="description" onChange={this.handleChange}/>

          <label htmlFor="name">Czas wykonania</label>
          <select type="text" id="time" onChange={this.handleChange}/>

          <label htmlFor="name">Poziom trudności</label>
          <select type="text" id="difficult" onChange={this.handleChange}/>

          <label htmlFor="name">Kategorie</label>
          <input type="text" id="tags" onChange={this.handleChange}/>

          <button onSubmit={this.handleSubmit}>Zapisz</button>
        </form>
      </div>
  )
  }
}

export default AppRecipeForm