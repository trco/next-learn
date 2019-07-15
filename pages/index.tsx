import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import { paginationOptions } from '../components/settings';
import Layout from '../components/Layout';
import PostModal, { modalContent } from '../components/PostModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

type State = {
  modalIsOpen: boolean;
  modalContent: modalContent;
  isLoading: boolean;
  posts: any[];
}

class PostsTable extends React.Component<{}, State> {

  state: State = {
    // modal
    modalIsOpen: false,
    modalContent: {
      title: '',
      author: '',
      url: ''
    },
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
  openModal = (id: number) => {
    // fetch data & save it to modalContent
    fetch('/api/posts/' + id)
      .then(res => res.json())
      .then(post => this.setState({
        modalContent: JSON.parse(post.body),
        modalIsOpen: true
      }));
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  detailsButton = (cell: number) => {
    return (
      <span
        onClick={() => this.openModal(cell)}
        style={{cursor: 'pointer'}}
      >
        Details
      </span>
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
    dataField: 'objectID',
    text: 'Actions',
    formatter: this.detailsButton
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
              modalContent={this.state.modalContent}
              onRequestClose={this.closeModal}
            />
          </div>
        }
      </Layout>
    );
  }
}

export default PostsTable;
