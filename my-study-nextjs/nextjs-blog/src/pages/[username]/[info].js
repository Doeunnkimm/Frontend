import Layout from 'components/Layout';
import SubLayout from 'components/SubLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UsernameInfo() {
  const router = useRouter();
  const { username, info, uid } = router.query;
  const [name, setName] = useState('');

  // useEffect(() => {
  //   fetch('/api/user')
  //     .then(res => res.json())
  //     .then(data => {
  //       setName(data.name);
  //     });
  // }, []);

  useEffect(() => {
    if (uid !== null) {
      fetch(`/api/user-info/${uid}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
        });
    }
  }, [uid]);

  return (
    <>
      <h2>
        UsernameInfo 🌱 {username}'s {info}
      </h2>
      <h2>Name: {name}</h2>
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
