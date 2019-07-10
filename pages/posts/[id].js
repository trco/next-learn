import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

class Post extends React.Component {

  static getInitialProps ({ query: { id } }) {
    return { id: id }
  }

  state = {
    content: []
  }

  componentDidMount() {
    // fetch data & save it to post
    fetch('/api/posts/' + this.props.id)
      .then(res => res.json())
      .then(post => this.setState({
        content: JSON.parse(post.body),
      }));
  }

  render() {
    return (
      <Layout>
        <h1>{this.state.content.title}</h1>
        <h3>Author: {this.state.content.author}</h3>
        <h4><a href={this.state.content.url}>Link</a></h4>
      </Layout>
    )
  }

}

export default Post;
