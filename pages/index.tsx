import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import { paginationOptions } from '../components/settings';
import Layout from '../components/Layout';
import PostModal, { modalTab1, modalTab2 } from '../components/PostModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

type State = {
  modalIsOpen: boolean;
  modal: {
    '0': {
      content: {
        title: string;
        author: string;
        url: string;
      };
      fetched: boolean;
    }
    '1': {
      content: {
        username: string;
        about: string;
        karma: string;
      };
      fetched: boolean;
    }
  };
  fetchParams: string[];
  openedTab: string;
  isLoading: boolean;
  posts: any[];
}

class PostsTable extends React.Component<{}, State> {

  initialModal = {
    // modal tab 0
    '0': {
      content: {
        title: '',
        author: '',
        url: ''
      },
      fetched: false
    },
    // modal tab 1
    '1': {
      content: {
        username: '',
        about: '',
        karma: ''
      },
      fetched: false
    }
  }

  state: State = {
    // modal
    modalIsOpen: false,
    modal: this.initialModal,
    fetchParams: [],
    openedTab: undefined,
    // table
    isLoading: true,
    posts: [],
  }

  componentDidMount() {
    // fetch data & save it to posts
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => this.setState({
        posts: JSON.parse(posts.body).hits,
        isLoading: false
      }));
  }

  // modal
  fetchTabData = (param: string, modalTab: string) => {
    if (!this.state.modal[modalTab].fetched) {
      const fetchPaths = {
        '0': '/api/posts/',
        '1': '/api/users/'
      }
      // construct fetchUrl
      const fetchUrl = fetchPaths[modalTab] + param;
      // fetch data & save it to modal
      fetch(fetchUrl)
        .then(res => res.json())
        .then(post =>
          this.setState({
            modal: {
              ...this.state.modal,
              [modalTab]: {
                content: JSON.parse(post.body),
                fetched: true
              }
            },
            modalIsOpen: true,
            openedTab: modalTab
          })
        );
    } else {
      this.setState({ openedTab: modalTab });
    }
  }

  openModal = (param: string, modalTab: string, fetchParams: string[]) => {
    this.fetchTabData(param, modalTab);
    this.setState({ fetchParams: fetchParams });
  }

  closeModal = () => {
    this.setState({
      modal: this.initialModal,
      modalIsOpen: false
    });
  }

  actionButtons = (cell: any, row: {}) => {
    // save all fetch params
    const fetchParams: string[] = [row['objectID'], row['author']];
    // access row data through row object
    return (
      <>
        <span
          onClick={() => this.openModal(row['objectID'], '0', fetchParams)}
          style={{cursor: 'pointer', marginRight: '0.5rem'}}
        >
          Details
        </span>
        <span
          onClick={() => this.openModal(row['author'], '1', fetchParams)}
          style={{cursor: 'pointer'}}
        >
          User
        </span>
      </>    
    );
  }

  // table
  columns = [{
    dataField: 'objectID',
    text: 'Id'
  }, {
    dataField: 'title',
    text: 'Title',
    filter: textFilter({
      placeholder: 'Search by title...'
    })
  }, {
    dataField: 'author',
    text: 'Author',
    filter: textFilter({
      placeholder: 'Search by author...'
    })
  }, {
    text: 'Actions',
    formatter: this.actionButtons,
  }];

  render () {
    return (
      <Layout>
        {
          this.state.isLoading ?
          <div>Loading ...</div> :
          <div>
            <BootstrapTable
              keyField='id'
              data={this.state.posts}
              columns={this.columns}
              filter={filterFactory()}
              pagination={paginationFactory(paginationOptions)}
              bootstrap4={true}
            />
            <PostModal
              isOpen={this.state.modalIsOpen}
              modal={this.state.modal}
              openedTab={this.state.openedTab}
              fetchParams={this.state.fetchParams}
              fetchTabData={this.fetchTabData}
              onRequestClose={this.closeModal}
            />
          </div>
        }
      </Layout>
    );
  }
}

export default PostsTable;
