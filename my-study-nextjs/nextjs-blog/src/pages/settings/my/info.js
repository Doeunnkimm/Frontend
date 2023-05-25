import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';

export default function MyInfo() {
  return (
    <>
      <h2>MyInfo 🍀</h2>
    </>
  );
}

MyInfo.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
