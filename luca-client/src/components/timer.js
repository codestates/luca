import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setTimerTimeOn } from "../redux/rootSlice";

const TimerImage = styled.div`
  display: flex;
  justify-content: left;
  text-align: center;
  /* border-radius: 4px;
    background-color: white;
    border: solid lightgrey 1px; */
  color: rgb(160, 160, 160);
  > div {
    > h3 {
      margin: 0;
      font-family: "Raleway", monospace !important;
      overflow: hidden;
      font-size: 2vh;
    }
  }
  button.start {
    flex: 1 0 auto;
    margin: 4px 4px 0 4px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: white;
    border: solid lightgrey 1px;
    color: rgb(160, 160, 160);
    font-size: 1.2rem;
  }
  button.start:hover {
    background-color: rgb(160, 160, 160);
    color: white;
  }
  button:active {
    transform: translateY(2px);
  }
`;

const TimerDisplay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  text-align: center;
  /* border-radius: 4px;
    background-color: white;
    border: solid lightgrey 1px; */
  color: rgb(160, 160, 160);

  button.playPause {
    font-family: "Raleway", serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1rem;
    margin: 0px;
    color: rgb(160, 160, 160);
    background: none;
    border: none;
  }
  button.upDown {
    font-family: "Raleway", serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1rem;
    margin: 0px;
    color: rgb(160, 160, 160);
    background: none;
    border: none;
  }
  button.start:hover {
    background-color: rgb(160, 160, 160);
    color: white;
  }
  button.upDown:hover {
    color: orange;
  }

  button.playPause:hover {
    color: red;
  }

  button:active {
    transform: translateY(2px);
  }
`;
const Timer = ({ timerHandler, setTime, time }) => {
  const dispatch = useDispatch();
  const timerOn = useSelector((state) => state.user.timerTimerOn);
  const settings = useSelector((state) => state.user.timerSettings);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  if (timerOn) {
    if (time <= 0) {
      dispatch(setTimerTimeOn(false));
      timerHandler("resetTimer");
    }
  }

  return (
    <div>
      <TimerImage>
        <div>
          {!settings && (
            <button
              className="start"
              onClick={() => timerHandler("clickTimer")}
            >
              <i class="fa-solid fa-hourglass"></i>
            </button>
          )}
        </div>
      </TimerImage>
      <TimerDisplay>
        <div className="Timer">
          {settings === true && (
            <h3>
              <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
            </h3>
          )}

          <div>
            {time >= 5 && timerOn === false && settings === true && (
              <button
                className="upDown"
                onClick={() => timerHandler("decreaseTime")}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
            )}
            {timerOn === false && settings === true && (
              <button
                className="upDown"
                onClick={() => timerHandler("increaseTime")}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>

          <div>
            {!timerOn && settings && time >= 5 && (
              <button
                className="playPause"
                onClick={() => timerHandler("startTimer")}
              >
                <i className="fa-solid fa-play"></i>
              </button>
            )}
            {timerOn && (
              <button
                className="playPause"
                onClick={() => timerHandler("pauseTimer")}
              >
                <i className="fa-solid fa-pause"></i>
              </button>
            )}
            {!timerOn && time > 0 && (
              <button
                className="playPause"
                onClick={() => timerHandler("resetTimer")}
              >
                <i className="fa-solid fa-circle-stop"></i>
              </button>
            )}
          </div>
        </div>
      </TimerDisplay>
    </div>
  );
};

export default Timer;
