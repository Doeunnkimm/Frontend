import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';

export async function getStaticProps() {
  console.log('server');
  return {
    props: { time: new Date().toISOString() },
  };
}

export default function SSG({ time }) {
  return (
    <>
      <h2>SSG 페이지입니다 :)</h2>
      <h3>{time}</h3>
    </>
  );
}

SSG.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
