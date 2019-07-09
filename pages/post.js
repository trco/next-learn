import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Post = () => {
  const router = useRouter();

  console.log(router);

  return (
    <Layout>
      <h1>{router.query.title}</h1>
    </Layout>
  )
}

export default Post;
