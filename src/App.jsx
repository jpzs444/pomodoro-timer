import { useState } from "react";

const App = () => {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25);

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25);
  }

  const decrementBreak = () => {
    if (breakLength >= 2)
      setBreakLength(breakLength - 1);
  }

  const incrementBreak = () => {
    if (breakLength <= 59)
      setBreakLength(breakLength + 1);
  }

  const decrementSession = () => {
    if (sessionLength >= 2) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(sessionLength - 1);
    }
  }

  const incrementSession = () => {
    if (sessionLength <= 59){
      setSessionLength(sessionLength + 1);
      setTimeLeft(sessionLength + 1);
    }
  }

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
      <p id="timer-label">Session</p>
      <p id="time-left">{timeLeft}</p>
      <button id="start_stop">start / stop</button>
      <button id="reset" onClick={resetTimer}>reset</button>

      {/* TODO: User Story #11, #18*/}
    </main>
  )
}

export default App