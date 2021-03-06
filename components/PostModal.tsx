import React from 'react';
import Modal from 'react-modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

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
type ModalProps = {
  modalIsOpened: boolean;
  modal: {}
  fetchTabData(param: string, modalTab: string): void;
  onRequestClose(): void;
}

// Tabs component
class TabsModal extends React.Component<ModalProps,{}> {

  fetchTabData = (eventKey: string) => {
    const param = this.props.modal['fetchParams'][eventKey];
    this.props.fetchTabData(param, eventKey);
  }

  render () {
    return (
      <div>
        <Tabs
          defaultActiveKey={this.props.modal['openedTab']}
          id="modal-tabs"
          onSelect={(eventKey: string) => this.fetchTabData(eventKey)}
        >
          <Tab eventKey='0' title='Details'>
            {
              this.props.modal['openedTab'] === '0' ?
              <>
                <h1>Title: {this.props.modal['0'].content.title}</h1>
                <p>Author: {this.props.modal['0'].content.author}</p>
                <p><a href={this.props.modal['0'].content.url}>Link</a></p>
                <button onClick={this.props.onRequestClose}>Close</button>
              </> :
              <></>
            }
          </Tab>
          <Tab eventKey='1' title='User'>
             {
              this.props.modal['openedTab'] === '1' ?
              <>
                <h1>User: {this.props.modal['1'].content.username}</h1>
                <p>About: {this.props.modal['1'].content.about}</p>
                <p>Karma: {this.props.modal['1'].content.karma}</p>
                <button onClick={this.props.onRequestClose}>Close</button>
              </> :
              <></>
            }
          </Tab>
        </Tabs>
      </div>
    )
  }
}

// PostModal component
class PostModal extends React.Component<ModalProps, {}> {

  render () {
    return (
      <Modal
        isOpen={this.props.modalIsOpened}
        onRequestClose={this.props.onRequestClose}
        style={customStyles}
      >
        <div>
          <TabsModal
            modalIsOpened={this.props.modalIsOpened}
            modal={this.props.modal}
            fetchTabData={this.props.fetchTabData}
            onRequestClose={this.props.onRequestClose}
          ></TabsModal>
        </div>
      </Modal>
    )
  }
};

export default PostModal;
