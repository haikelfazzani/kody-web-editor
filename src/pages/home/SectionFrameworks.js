import React from 'react';

const icons = ['javascript', 'jquery', 'react', 'preact', 'vue', 'backbone', 'typescript', 'coffeescript', 'lodash', 'rxjs', 'pouchdb', 'moment'];

export default function SectionFrameworks() {
  return <section className="py-5">
  <h3 className="text-muted text-center">All in one place</h3>
  <h2 className="text-center mb-5">Your favorite Frameworks and libraries.</h2>
  <div className="row fs-35">
    {icons.map(icon => <div className="col-md-2 mb-3" key={icon}>
      <div className="card">
        <div className="card-body text-center">
          <img className="mb-3" src={`https://deroados.sirv.com/logos/${icon}.svg`} alt={icon} width="100" height="100" />
          <span className="text-center text-uppercase font-weight-bold">{icon}</span>
        </div>
      </div>
    </div>)}
  </div>
</section>
}