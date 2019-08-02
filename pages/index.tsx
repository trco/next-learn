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
  modalTab1: modalTab1;
  modalTab2: modalTab2;
  openedTab: number;
  alreadyOpenedTabs: number[];
  isLoading: boolean;
  posts: any[];
}

class PostsTable extends React.Component<{}, State> {

  state: State = {
    // modal
    modalIsOpen: false,
    modalTab1: {
      title: '',
      author: '',
      url: ''
    },
    modalTab2: {
      username: '',
      about: '',
      karma: ''
    },
    openedTab: undefined,
    alreadyOpenedTabs: [],
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
  openModal = (param: number|string, modalTab: number) => {
    // construct fetchUrl
    const fetchUrl = modalTab == 0 ?
      '/api/posts/' + param :
      '/api/users/' + param;
    console.log(fetchUrl);
    // fetch data & save it to modalContent
    fetch(fetchUrl)
      .then(res => res.json())
      .then(post =>
        // open modalTab1
        modalTab == 0 ?
        this.setState({
          modalTab1: JSON.parse(post.body),
          modalIsOpen: true,
          openedTab: 0,
          alreadyOpenedTabs: [...this.state.alreadyOpenedTabs, 0]
        }) :
        // open modalTab2
        this.setState({
          modalTab2: JSON.parse(post.body),
          modalIsOpen: true,
          openedTab: 1,
          alreadyOpenedTabs: [...this.state.alreadyOpenedTabs, 1]
        })
      );
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  actionButtons = (cell: any, row: {}) => {
    // access row data through row object
    return (
      <>
        <span
          onClick={() => this.openModal(row['objectID'], 0)}
          style={{cursor: 'pointer', marginRight: '0.5rem'}}
        >
          Details
        </span>
        <span
          onClick={() => this.openModal(row['author'], 1)}
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
              modalTab1={this.state.modalTab1}
              modalTab2={this.state.modalTab2}
              openTab={this.state.openedTab}
              onRequestClose={this.closeModal}
              alreadyOpenedTabs={this.state.alreadyOpenedTabs}
            />
          </div>
        }
      </Layout>
    );
  }
}

export default PostsTable;
