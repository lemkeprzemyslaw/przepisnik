import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {compose} from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import { withFirebase } from '../Firebase'

const styles = theme => ({
  upload: {
    marginLeft: theme.spacing(3),
  },
});

class ImageUploadArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      url: '',
    }
  }

  onChange = (event) => {
    this.setState({ image: event.target.files[0] });
    setTimeout(() => console.log(this.state.image), 2000)
  };

  onSubmit = () => {
    const storageRef = this.props.firebase.storage.ref();

    storageRef.child('recipesImage/' + this.state.image.name)
      .put(this.state.image)
      .then(() => {
        this.setState({
          url: 'gs://bucket/images/recipesImage/' + this.state.image.name
        })
      })
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
        <OutlinedInput id="upload-file" type="file" onChange={this.onChange}/>
        <Button variant="contained" onClick={this.onSubmit} type='submit' color='primary' className={this.props.classes.upload}>Dodaj zdjęcie</Button>
      </div>
    );
  }
}

const ImageUpload = compose(
  withFirebase,
  withStyles(styles)
)(ImageUploadArea);

export default ImageUpload;