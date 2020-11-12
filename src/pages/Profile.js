import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DropboxService } from '../services/DropboxService';
import { withRouter, Link } from 'react-router-dom';

function Profile (props) {

  const [userAccount, setUserAccount] = useState(null);
  const [userFiles, setUserFiles] = useState(null);

  useEffect(() => {
    Promise.all([DropboxService.userAccount(), DropboxService.getFiles()])
      .then(([account, files]) => {
        if (account && files) {
          setUserAccount(account);
          setUserFiles(files);
        }
      })
      .catch(e => {
        props.history.push('/')
      });
  }, []);

  return (<>
    <Navbar />

    <div className="container profile py-5">

      <div className="row">

        {userAccount && userAccount.name
          && <div className="col-md-3">
            <div className="card text-dark">

              <img
                src={userAccount.profile_photo_url}
                className="card-img-top rounded-circle w-50 mx-auto"
                alt={userAccount.name.display_name}
              />

              <div className="card-body">
                <h5 className="card-title">{userAccount.name.display_name}</h5>
                <p className="card-text fs-12 text-muted"><i className="fa fa-envelope fs-12"></i> {userAccount.email}</p>

                <div className="btn-group" role="group" aria-label="Basic example">
                  <Link to="/" className="btn btn-secondary"><i className="fa fa-home fs-14"></i></Link>
                  <Link to="/playground" className="btn btn-secondary"><i className="fa fa-terminal fs-14"></i></Link>
                </div>

              </div>
            </div>
          </div>}


        <div className="col-md-9">

          {userFiles
            && <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">filename</th>
                    <th scope="col">server modified</th>
                    <th scope="col">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userFiles.map((file, i) => <tr key={file.name}>
                    <th scope="row">{i + 1}</th>
                    <td>{file.name}</td>
                    <td>{file.server_modified}</td>
                    <td><Link className="btn btn-secondary fs-12" to={"/playground/dropbox/" + file.name}>
                      <i className="fa fa-pen-square"></i> Open</Link></td>
                  </tr>)}
                </tbody>
              </table>
            </div>}

        </div>


      </div>

    </div>

    <Footer />

  </>);
}


export default withRouter(Profile);
