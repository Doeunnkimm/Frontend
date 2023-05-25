import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';

export default function CategorySlug() {
  return (
    <>
      <h2>CategorySlug 📝</h2>
    </>
  );
}

CategorySlug.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
