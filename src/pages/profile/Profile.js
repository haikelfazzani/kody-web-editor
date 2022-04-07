import React, { Suspense } from 'react';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';

const ListFiles = React.lazy(() => import('./ListFiles'));
const UserInfos = React.lazy(() => import('./UserInfos'));

export default function Profile() {
  return (<>
    <main className="bg-inherit grid-1-3 br7 py-3 pr-3 pl-3 mx-auto">
      <Suspense fallback={<Spinner />}>
        <div><UserInfos /></div>
        <div><ListFiles /></div>
      </Suspense>
    </main>
    <Footer />
  </>);
}
