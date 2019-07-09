import Link from 'next/link';
import Layout from '../components/Layout';

const PostLink = (props) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

const Index = () => (
  <Layout>
    <p>Home page</p>
    <ul>
      <PostLink title='Post #1'/>
      <PostLink title='Post #2'/>
      <PostLink title='Post #3'/>
    </ul>
  </Layout>
);

export default Index;
