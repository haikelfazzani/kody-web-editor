import React, { Suspense } from 'react';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';

const ListFiles = React.lazy(() => import('./ListFiles'));
const UserInfos = React.lazy(() => import('./UserInfos'));

export default function Profile() {
  return (<>
    <main className="grid-1-3 br7">
      <Suspense fallback={<Spinner />}>
        <div><UserInfos /></div>
        <div><ListFiles /></div>
      </Suspense>
    </main>
    <Footer />
  </>);
}
