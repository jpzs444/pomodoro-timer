import { useEffect, useRef, useState } from "react";
import { arrow, pause, play, reset, tomato } from './assets';

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
    pauseAudio();
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
      setTimeLeft(`${sessionLength < 11
        ? '0' + sessionLength - 1 + ':00' 
        : sessionLength - 1 + ':00'
      }`)
    }
  }

  const incrementSession = () => {
    if (sessionLength <= 59){
      setSessionLength(prevSessionLength => prevSessionLength + 1);
      setTimeLeft(`${sessionLength < 9
        ? '0' + sessionLength + 1 + ':00' 
        : sessionLength + 1 + ':00'
      }`)
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
          setTimeout(() => playAudio(), 1000);
          setTimeout(() => setIsSessionDone(prevIsSessionDone => !prevIsSessionDone), 4000);
          
          if (!isSessionDone) {
            setTimeout(() => setTimeLeft(`${breakLength < 10 
              ? '0' + breakLength + ':00' 
              : breakLength + ':00'}`)
            , 4000);
          } else {
            setTimeout(() => setTimeLeft(`${sessionLength < 10 
              ? '0' + sessionLength + ':00' 
              : sessionLength + ':00'}`)
            , 4000);
          }
        }
      }, 500);
    } else {
      clearInterval(timer.current);
    }

    return () => clearInterval(timer.current);
  }, [isTimerOn, timer, sessionLength, timeLeft, breakLength, isSessionDone]);

  const playAudio = () => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => audio.pause(), 4000);
  }

  const pauseAudio = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  return (
    <main className="container d-flex flex-column justify-content-center align-items-center text-center" >
      {/* Output */}
      <div className="timer-label-container d-flex justify-content-center align-items-center" >
        <img src={tomato} alt="tomato-img" className="tomato-img" />
        <p id="timer-label" className="fw-semibold" >{isSessionDone ? 'Break' : 'Session'}</p>
      </div>
      <p id="time-left" className="fw-bold" >{timeLeft}</p>
      <div className="btn-main-container container grid row" >
        <div className="btn-container col-6 text-end" >
          <button 
            id="start_stop"
            className="btn"
            onClick={() => setIsTimerOn(prevIsTimerOn => !prevIsTimerOn)} >
            <img src={play} alt="play-img" className="play-img" />
            <img src={pause} alt="pause-img" className="pause-img" />
            <audio 
              id="beep" 
              src="https://actions.google.com/sounds/v1/alarms/mechanical_clock_ring.ogg"
              type="audio/ogg" >
            </audio>
          </button>
        </div>
        <div className="btn-container col-6 text-start d-flex align-items-center" >
          <button 
            id="reset" 
            className="btn"
            onClick={resetTimer} >
              <img src={reset} alt="reset-img" className="reset-img" />
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="container d-flex align-items-center" >
        <div className="container d-flex flex-column gap-2" >
          <p id="break-label" className="length-label" >Break Length</p>
          <div className="container d-flex justify-content-center align-items-center gap-3" >
            <button 
              id="break-decrement" 
              className="decrement-btn btn" 
              onClick={decrementBreak} >
                <img src={arrow} alt="arrow-down" className="arrow-down-img" />
            </button>
            <p id="break-length" className="length fw-bold" >{breakLength}</p>
            <button 
              id="break-increment" 
              className="increment-btn btn" 
              onClick={incrementBreak} >
                <img src={arrow} alt="arrow-up" className="arrow-up-img" />
            </button>
          </div>
        </div>
        <div className="container d-flex flex-column gap-2" >
          <p id="session-label" className="length-label" >Session Length</p>
          <div className="container d-flex justify-content-center align-items-center gap-3" >
            <button 
              id="session-decrement" 
              className="decrement-btn btn" 
              onClick={decrementSession} >
                <img src={arrow} alt="arrow-down" className="arrow-down-img" />
            </button>
            <p id="session-length" className="length fw-bold" >{sessionLength}</p>
            <button 
              id="session-increment" 
              className="increment-btn btn" 
              onClick={incrementSession}>
                <img src={arrow} alt="arrow-up" className="arrow-up-img" />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App