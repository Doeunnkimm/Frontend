import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';

export default function UsernameInfo() {
  return (
    <>
      <h2>UsernameInfo 🌱</h2>
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
