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

type PostModalProps = {
  isOpen: boolean;
  modal: {}
  openedTab: string;
  onRequestClose(): void;
}

type TabsProps = {
  modal: {};
  openedTab: string;
  onRequestClose(): void;
}

// Tabs component
class TabsModal extends React.Component<TabsProps,{}> {

  fetchData = (eventKey) => {
    console.log('Not in array');
  }

  render () {
    console.log(this.props.modal['0']);
    
    return (
      <div>
        <Tabs
          defaultActiveKey={this.props.openedTab }
          id="modal-tabs"
          onSelect={(eventKey) => this.fetchData(eventKey)}
        >
          <Tab eventKey='0' title='Details'>
            {
              this.props.openedTab === '0' ?
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
              this.props.openedTab === '1' ?
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
class PostModal extends React.Component<PostModalProps, {}> {

  render () {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={customStyles}
      >
        <div>
          <TabsModal
            modal={this.props.modal}
            openedTab={this.props.openedTab}
            onRequestClose={this.props.onRequestClose}
          ></TabsModal>
        </div>
      </Modal>
    )
  }
};

export default PostModal;
