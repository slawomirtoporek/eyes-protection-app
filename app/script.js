import React, { useState, useMemo, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(); // seconds
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if(status === 'work') setTime(1200);
    if(status === 'rest') setTime(20);
  }, [status]);

  const padTo2Digits = num => {
    return num.toString().padStart(2, '0');
  };

  const formatTime = useMemo(() => {
    const formatedTimer = sec => {
      const min = Math.floor(sec / 60);
      sec = sec % 60;
      return `${padTo2Digits(min)}:${padTo2Digits(sec)}`;
    };

    return formatedTimer(time);
  }, [time]);
  
  const startTimer = () => {
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(prevValue => {
        if (prevValue <= 0) {
          setStatus(prevStatus => prevStatus === 'work' ? 'rest' : 'work');
        } else {
            return prevValue - 1;
        };
      });
    }, 1000));
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' ? (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      ) : ''}
      {status === 'work' ? (
        <img src="./images/work.png" />
      ) : ''}
      {status === 'rest' ? (
        <img src="./images/rest.png" />
      ) : ''}
      {status !== 'off' ? (
        <div className="timer">
          {formatTime}
        </div>
      ) : ''}
      {status === 'off' ? (
        <button className="btn" onClick={startTimer}>Start</button>
      ) : ''} 
      {status !== 'off' ? (
        <button className="btn">Stop</button>
      ) : ''}
      <button className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
