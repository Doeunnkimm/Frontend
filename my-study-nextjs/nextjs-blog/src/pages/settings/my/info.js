import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';
import { useState } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  console.log('server');

  return {
    props: {},
  };
}

export default function MyInfo() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const { status = 'initial' } = router.query;
  return (
    <>
      <h2>MyInfo 🍀</h2>
      <h2>✔️ Clicked ➡️ {String(clicked)}</h2>
      <h2>✔️ Status ➡️ {status}</h2>
      <button
        onClick={() => {
          alert('EDIT');
          setClicked(true);
          location.replace('/settings/my/info?status=editing');
        }}
      >
        EDIT(replace)
      </button>
      <br />
      <button
        onClick={() => {
          alert('EDIT');
          setClicked(true);
          router.push('/settings/my/info?status=editing');
        }}
      >
        EDIT(push)
      </button>
      <br />
      <button
        onClick={() => {
          alert('EDIT');
          setClicked(true);
          router.push('/settings/my/info?status=editing', undefined, {
            shallow: true,
          });
        }}
      >
        EDIT(shallow)
      </button>
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
