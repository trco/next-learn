import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

// 'href' is the path of the page in pages folder
// 'as' is the URL shown in browser
const PostLink = (props) => (
  <li>
    <Link href='/posts/[id]' as={`/posts/${props.id}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

class Index extends React.Component {

  state = {
    isLoading: true,
    posts: []
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

  render() {
    return (
      <Layout>
        <p>Posts</p>
        {
          this.state.isLoading ?
          <p>Loading ...</p> :
          <ul>
            {this.state.posts.map((post) => (
              <PostLink
                title={post.title}
                id={post.objectID}
                key={post.objectID}
              />
            ))}
          </ul>
        }
      </Layout>
    )
  }
}

export default Index;
