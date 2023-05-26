import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CartDateSlug() {
  const router = useRouter();
  const { date } = router.query;

  return (
    <>
      <h2>CartDateSlug 🛒{JSON.stringify(date)}</h2>
      <Link href="/cart/2023/05/26">2023년 05월 26일</Link>
      <br />
      <button onClick={() => router.push('/cart/2023/05/27')}>
        2023년 05월 27일
      </button>
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
