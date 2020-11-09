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

  return (<div className="w-100">

    <span className="text-white text-uppercase pl-3 pr-3 ltsp"><i className="fas fa-stopwatch"></i> chronometre</span>

    <ul className="w-100 list-group d-flex flex-row flex-fill fs-18 mt-2">

      {(!timerOps.isPlay && !timerOps.isPaused)
        && <li className="list-group-item text-success" onClick={onStart}>
          <i className="fa fa-play"></i>
        </li>}

      {(timerOps.isResumed || timerOps.isPlay)
        && <li className="list-group-item text-primary" onClick={onPause}>
          <i className="fa fa-pause"></i>
        </li>}

      {timerOps.isPaused
        && <li className="list-group-item text-primary" onClick={() => { onStart('resume') }}>
          <i className="fa fa-play"></i>
        </li>}

      <li className="list-group-item flex-grow-1 text-center">{dispTimer}</li>

      <li className="list-group-item text-danger" onClick={onReset}>
        <i className="fa fa-recycle"></i>
      </li>
    </ul>

  </div>);
}