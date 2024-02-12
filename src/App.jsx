import { useEffect, useRef, useState } from "react";

const App = () => {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState('25:00');
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isSessionDone, setIsSessionDone] = useState(false);

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft('25:00');
    setIsTimerOn(false);
    setIsSessionDone(false);
    clearInterval(timer.current);
  }

  const decrementBreak = () => {
    if (breakLength >= 2)
      setBreakLength(prevBreakLength => prevBreakLength - 1);
  }

  const incrementBreak = () => {
    if (breakLength <= 59)
      setBreakLength(prevBreakLength => prevBreakLength + 1);
  }

  const decrementSession = () => {
    if (sessionLength >= 2) {
      setSessionLength(prevSessionLength => prevSessionLength - 1);

      if (sessionLength < 11) {
        setTimeLeft(`0${sessionLength - 1}:00`);
      } else {
        setTimeLeft(`${sessionLength - 1}:00`);
      }
    }
  }

  const incrementSession = () => {
    if (sessionLength <= 59){
      setSessionLength(prevSessionLength => prevSessionLength + 1);

      if (sessionLength < 9) {
        setTimeLeft(`0${sessionLength + 1}:00`);
      } else {
        setTimeLeft(`${sessionLength + 1}:00`);
      }
    }
  }

  let timer = useRef(null);

  useEffect(() => {
    let currentTime = timeLeft.split(':');
    let time = parseInt(currentTime[0]) * 60 + parseInt(currentTime[1]);

    if (isTimerOn && time >= 1) {
      timer.current = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        setTimeLeft(`${minutes}:${seconds}`);
        time--;

        if (time < 0) {
          clearInterval(timer.current);
          setIsSessionDone(prevIsSessionDone => !prevIsSessionDone);
          if (!isSessionDone) {
            setTimeout(() => setTimeLeft(`${breakLength < 10 
              ? '0' + breakLength + ':00' 
              : breakLength + ':00'}`)
            , 1000);
          } else {
            setTimeout(() => setTimeLeft(`${sessionLength < 10 
              ? '0' + sessionLength + ':00' 
              : sessionLength + ':00'}`)
            , 1000);
          }
        }
      }, 500);
    } else {
      clearInterval(timer.current);
    }

    return () => clearInterval(timer.current);
  }, [isTimerOn, timer, sessionLength, timeLeft, breakLength, isSessionDone]);

  return (
    <main>
      {/* Input */}
      <div className="break" style={{marginTop: 50}}>
        <p id="break-label">Break Length</p>
        <button id="break-decrement" onClick={decrementBreak}>-</button>
        <button id="break-increment" onClick={incrementBreak}>+</button>
        <p id="break-length">{breakLength}</p>
      </div>
      <div className="session">
        <p id="session-label">Session Length</p>
        <button id="session-decrement" onClick={decrementSession}>-</button>
        <button id="session-increment" onClick={incrementSession}>+</button>
        <p id="session-length">{sessionLength}</p>
      </div>

      {/* Output */}
      <p id="timer-label">{isSessionDone ? 'Break' : 'Session'}</p>
      <p id="time-left">{timeLeft}</p>
      <button id="start_stop" onClick={() => setIsTimerOn(prevIsTimerOn => !prevIsTimerOn)}>start / stop</button>
      <button id="reset" onClick={resetTimer}>reset</button>

      {/* TODO: User Story #26*/}
    </main>
  )
}

export default App