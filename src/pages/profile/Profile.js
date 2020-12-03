import React,{Suspense} from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';

const ListFiles = React.lazy(() => import('./ListFiles'));
const UserInfos = React.lazy(() => import('./UserInfos'));

function Profile () {
  return (<>
    <Navbar />
    <div className="container profile py-5">
      <Suspense fallback={<Spinner />}>
        <div className="row">
          <div className="col-md-3"><UserInfos /></div>
          <div className="col-md-9"><ListFiles /></div>
        </div>
      </Suspense>
    </div>
    <Footer />
  </>);
}


export default withRouter(Profile);
