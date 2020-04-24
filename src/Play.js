import React, {useState, useEffect} from 'react';
import Firestore from './services/firestore.js';
import Board from './Board';
import './Play.css';

function Play(props) {
  const [timeSec, setTimeSec] = useState(0);
  const [startTime, setStartTime] = useState(Math.floor(Date.now()/1000));
  const [intervalId, setIntervalId] = useState(null);
  const userId = props.userId;
  const gridId = props.gridId;

  function stopTimer() {
    clearInterval(intervalId);
    return Date.now() - startTime;
  }

  function startTimer() {
    setIntervalId(setInterval(() => {
      setTimeSec(Math.floor(Date.now()/1000) - startTime);
    }, 1000));
  }
  useEffect(startTimer, []);


  function finishGame(score) {
    console.log("game finished");
    // Todo: Load leaderboard.
    const score_sec = stopTimer();
    if (userId && gridId) {
      const score_obj = Firestore.add.score(userId, gridId, score_sec);
      if (score_obj === null) {
        // Todo: Surface error to user.
        console.log("Couldn't upload score.");
      }
    }
  }
  const default_grid = [
    ["1", "1", "1", "1"],
    ["1", "1", "S", "1"],
    ["0", "0", "1", "1"],
    ["0", "0", "F", "0"],
  ];
  return (
    <>
      <div className="trophy"></div>
      <div className="game">
        {
          // Todo: Use flexbox to center board.
        }
        <Board grid={props.grid || default_grid} finishGame={finishGame} />
      </div>
      <div className="stopwatch">
        <div className="stopwatch-display">
          {Math.floor(timeSec / 60)} : {("0"+timeSec%60).substr(-2)}
        </div>
      </div>
    </>
  );
}

 export default Play;
