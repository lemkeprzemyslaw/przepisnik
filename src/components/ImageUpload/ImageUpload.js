import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase'

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      url: '',
    }
  }

  onChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  onSubmit = () => {
    const storageRef = this.props.firebase.storage.ref();

    storageRef.child('recipesImage/${}')
      .put(this.state.image)
      .catch(error => {
        this.setState({ error });
        setTimeout(() => {
          this.setState({ error: null })
        }, 6000)
      })
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange}/>
        <button onClick={this.onSubmit} type='submit'>Dodaj zdjęcie</button>
      </div>
    );
  }
}

ImageUpload.propTypes = {};

export default withFirebase(ImageUpload);