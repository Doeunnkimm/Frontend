import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';

export default function CartDateSlug() {
  return (
    <>
      <h2>CartDateSlug 🛒</h2>
    </>
  );
}

CartDateSlug.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
