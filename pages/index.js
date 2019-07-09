import Link from 'next/link';
import Layout from '../components/Layout';

// 'href' is the path of the page in pages folder
// 'as' is the URL shown in browser
const PostLink = (props) => (
  <li>
    <Link href='/posts/[id]' as={`/posts/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

const Index = () => (
  <Layout>
    <p>Home page</p>
    <ul>
      <PostLink id='post-1'/>
      <PostLink id='post-2'/>
      <PostLink id='post-3'/>
    </ul>
  </Layout>
);

export default Index;
