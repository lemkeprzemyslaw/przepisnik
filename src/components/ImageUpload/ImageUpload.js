import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      url: '',
    }
  }

  onChange = (event) => {
      this.setState({ image: event.target.files[0] })
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange}/>
        <button>Dodaj zdjęcie</button>
      </div>
    );
  }
}

ImageUpload.propTypes = {};

export default ImageUpload;