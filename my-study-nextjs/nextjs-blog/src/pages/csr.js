import { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';

export default function CSR() {
  const [time, setTime] = useState();

  useEffect(() => {
    setTime(new Date().toISOString());
  }, []);

  return (
    <>
      <h2>CSR 페이지입니다 :)</h2>
      <h3>{time}</h3>
    </>
  );
}

CSR.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
