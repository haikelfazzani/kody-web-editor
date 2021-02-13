import React from 'react';

export default function Captcha () {

  const numOne = Math.floor(Math.random() * 100);
  const numTwo = Math.floor(Math.random() * 100);

  return (<div>
    <div className="card mb-3">
      <div className="row no-gutters">

        <div className="col-2 bg-light border">
          <div className="py-2 pl-3 pr-3 fs-18 ltsp">{numOne} + {numTwo} = ?</div>
        </div>

        <div className="col-10">
          <input
            type="number"
            name="captcha"
            data-captcha={numOne + numTwo}
            className="form-control h-100"
            required
          />
        </div>

      </div>
    </div>
  </div>);
}
