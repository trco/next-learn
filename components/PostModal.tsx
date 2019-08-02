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

// types
export type modalTab1 = {
  title: string;
  author: string;
  url: string;
}

export type modalTab2 = {
  username: string;
  about: string;
  karma: string;
}

type Props = {
  isOpen: boolean;
  modalTab1: modalTab1;
  modalTab2: modalTab2;
  openTab: number;
  onRequestClose(): void;
}

// Tab component
class ModalTab extends React.Component<{},{}> {

  render () {
    return (
      <div></div>
    )
  }
}


// PostModal component
class PostModal extends React.Component<Props, {}> {

  render () {
    const openTab = this.props.openTab;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={customStyles}
      >
        <div>
          {(() => {
            switch(openTab) {
              case 1:
                return (
                  <>
                    <h1>Title: {this.props.modalTab1.title}</h1>
                    <p>Author: {this.props.modalTab1.author}</p>
                    <p><a href={this.props.modalTab1.url}>Link</a></p>
                    <button onClick={this.props.onRequestClose}>Close</button>
                  </>
                )
              case 2:
                return (
                  <>
                    <h1>User: {this.props.modalTab2.username}</h1>
                    <p>About: {this.props.modalTab2.about}</p>
                    <p>Karma: {this.props.modalTab2.karma}</p>
                    <button onClick={this.props.onRequestClose}>Close</button>
                  </>
                  )
            }
          })()}
        </div>
      </Modal>
    )
  }
};

export default PostModal;
