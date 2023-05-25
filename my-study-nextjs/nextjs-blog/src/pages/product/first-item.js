import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';

export default function FirstItem() {
  return (
    <>
      <h2>First Item 🛒</h2>
    </>
  );
}

FirstItem.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
