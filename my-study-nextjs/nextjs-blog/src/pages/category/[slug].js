import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';
import { useRouter } from 'next/router';

export default function CategorySlug() {
  const router = useRouter();
  const { slug, from } = router.query;

  return (
    <>
      <h2>
        CategorySlug slug: {slug}📝 from {from}
      </h2>
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
