import React, { useState, useEffect } from 'react';

var idFnTimer;

export default function Timer () {

  const [timerOps, setTimerOps] = useState({ isPlay: false, isPaused: false, isResumed: false });
  const [timer, setTimer] = useState(0);
  const [dispTimer, setDispTimer] = useState('00:00:00');

  const onStart = (event) => {
    if (event === 'resume') {
      setTimerOps({ ...timerOps, isPlay: true, isPaused: false, isResumed: true });
    }
    else {
      setTimerOps({ ...timerOps, isPlay: true, isPaused: false, isResumed: false });
    }

    idFnTimer = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  }

  const onPause = () => {
    setTimerOps({ ...timerOps, isPlay: false, isPaused: true, isResumed: false });
    clearInterval(idFnTimer);
  }

  const onReset = () => {
    setTimerOps({ ...timerOps, isPlay: false, isPaused: false, isResumed: false });
    setTimer(0);
    clearInterval(idFnTimer);
  }

  useEffect(() => {
    let sec = (timer % 60) | 0;
    let min = (timer / 60) | 0;
    let h = (timer / 3600) | 0;

    sec = sec < 10 ? '0' + sec : sec;
    min = (min < 1 || min > 59) ? '00' : min > 9 ? min : '0' + min;
    h = (h < 1 || h > 59) ? '00' : h > 9 ? h : '0' + h;

    setDispTimer(h + ':' + min + ':' + sec);
  }, [timer, setTimer]);

  return (<div className="w-100 bg-p">

    <button className="btn btn-primary btn-block mb-2">
      {dispTimer} <i className="fas fa-stopwatch"></i>
    </button>

    <div className="w-100 btn-group" role="group" aria-label="Basic example">

      {(!timerOps.isPlay && !timerOps.isPaused)
        && <button className="btn btn-success" onClick={onStart}>
          <i className="fa fa-play"></i>
        </button>}

      {(timerOps.isResumed || timerOps.isPlay)
        && <button className="btn btn-success" onClick={onPause}>
          <i className="fa fa-pause"></i>
        </button>}

      {timerOps.isPaused
        && <button className="btn btn-success" onClick={() => { onStart('resume') }}>
          <i className="fa fa-play"></i>
        </button>}

      <button className="btn btn-danger" onClick={onReset}>
        <i className="fa fa-recycle"></i>
      </button>
    </div>

  </div>);
}