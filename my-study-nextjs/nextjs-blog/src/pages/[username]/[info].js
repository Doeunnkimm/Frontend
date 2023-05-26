import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';
import { useRouter } from 'next/router';

export default function UsernameInfo() {
  const router = useRouter();
  const { username, info } = router.query;
  return (
    <>
      <h2>
        UsernameInfo 🌱 {username}'s {info}
      </h2>
    </>
  );
}

UsernameInfo.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
