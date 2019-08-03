import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import { paginationOptions } from '../components/settings';
import Layout from '../components/Layout';
import PostModal from '../components/PostModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

type State = {
  modalIsOpened: boolean;
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
    },
    openedTab: string;
    fetchParams: string[];
  };
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
    },
    openedTab: undefined,
    fetchParams: []
  }

  state: State = {
    // modal
    modalIsOpened: false,
    modal: this.initialModal,
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
              },
              openedTab: modalTab
            },
            modalIsOpened: true,
          })
        );
    } else {
      this.setState({
        modal: {
          ...this.state.modal,
          openedTab: modalTab
        }
      });
    }
  }

  openModal = (param: string, modalTab: string, fetchParams: string[]) => {
    this.fetchTabData(param, modalTab);
    this.setState({
      modal: {
        ...this.state.modal,
        fetchParams: fetchParams
      }
    });
  }

  closeModal = () => {
    this.setState({
      modal: this.initialModal,
      modalIsOpened: false
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
              modalIsOpened={this.state.modalIsOpened}
              modal={this.state.modal}
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
