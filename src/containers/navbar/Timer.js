import React, { useState, useEffect } from 'react';
import './Timer.css';

var idFnTimer;

export default function Timer () {

  const [timerOps, setTimerOps] = useState({
    showTimer: false,
    isPlay: false,
    isPaused: false,
    isResumed: false
  });

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

  return (<div className="timer">

    <button className="btn btn-primary pb-2"
      onClick={() => { setTimerOps({ ...timerOps, showTimer: !timerOps.showTimer }) }}>
      {dispTimer} <i className="fas fa-stopwatch"></i>
    </button>

    <div className="timer-modal" style={{ display: timerOps.showTimer ? 'block' : 'none' }}>
      <button className="btn btn-warning mb-3 fs-14 w-100">
        {dispTimer} <i className="fas fa-stopwatch"></i>
      </button>


      {(!timerOps.isPlay && !timerOps.isPaused)
        && <button className="btn btn-success w-100 mb-3" onClick={onStart}>
          <i className="fa fa-play"></i> start
      </button>}

      {(timerOps.isResumed || timerOps.isPlay)
        && <button className="btn btn-success w-100 mb-3" onClick={onPause}>
          <i className="fa fa-pause"></i> pause
      </button>}

      {timerOps.isPaused && <button className="btn btn-success w-100 mb-3" onClick={() => { onStart('resume') }}>
        <i className="fa fa-play"></i> resume
      </button>}

      <button className="btn btn-danger w-100" onClick={onReset}>
        <i className="fa fa-recycle"></i> reset
      </button>
    </div>
  </div>);
}