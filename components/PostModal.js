import React from 'react';
import Modal from 'react-modal';

// bind modal to the app element
Modal.setAppElement('#__next');

// css
const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class PostModal extends React.Component {

  render () {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={customStyles}
      >
        <div>
          <h1>Title: {this.props.modalContent.title}</h1>
          <p>Author: {this.props.modalContent.author}</p>
          <p><a href={this.props.modalContent.url}>Link</a></p>
          <button onClick={this.props.onRequestClose}>Close</button>
        </div>
      </Modal>
    )
  }
};

export default PostModal;
