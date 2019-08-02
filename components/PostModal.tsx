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
  openTab: number;
  modalTab1: modalTab1;
  modalTab2: modalTab2;
  alreadyOpenedTabs: number[];
  onRequestClose(): void;
}

type TabsProps = {
  openedTab: number;
  alreadyOpenedTabs: number[];
  modalTab1: modalTab1;
  modalTab2: modalTab2;
  onRequestClose(): void;
}

// Tabs component
class TabsModal extends React.Component<TabsProps,{}> {

  fetchData = (eventKey) => {
    if (!this.props.alreadyOpenedTabs.includes(parseInt(eventKey)))
      console.log('Not in array');
  }

  render () {
    return (
      <div>
        <Tabs
          defaultActiveKey={this.props.openedTab }
          id="modal-tabs"
          onSelect={(eventKey) => this.fetchData(eventKey)}
        >
          <Tab eventKey="0" title="Details">
            {
              this.props.openedTab == 0 ?
              <>
                <h1>Title: {this.props.modalTab1.title}</h1>
                <p>Author: {this.props.modalTab1.author}</p>
                <p><a href={this.props.modalTab1.url}>Link</a></p>
                <button onClick={this.props.onRequestClose}>Close</button>
              </> :
              <></>
            } 
          </Tab>
          <Tab eventKey="1" title="User">
            {
              this.props.openedTab == 1 ?
              <>
                <h1>User: {this.props.modalTab2.username}</h1>
                <p>About: {this.props.modalTab2.about}</p>
                <p>Karma: {this.props.modalTab2.karma}</p>
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
            onRequestClose={this.props.onRequestClose}
            openedTab={this.props.openTab}
            modalTab1={this.props.modalTab1}
            modalTab2={this.props.modalTab2}
            alreadyOpenedTabs={this.props.alreadyOpenedTabs}
          ></TabsModal>
        </div>
      </Modal>
    )
  }
};

export default PostModal;
