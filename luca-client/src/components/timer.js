import $ from "jquery";
import { useState, useEffect } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
    text-align: center;
  margin: 0;
  font-family: "Raleway", monospace !important;
  overflow: hidden;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 2vh;

  button.start {
  font-family: "Raleway", serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
  margin: 0px;
  color: #ff7f50;
  background: none;
  border: none;
}

button.upDown {
  font-family: "Raleway", serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
  margin: 0px;
  color: #ffb07e;
  background: none;
  border: none;
}

button.playPause {
  font-family: "Raleway", serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
  margin: 0px;
  color: #fc7878;
  background: none;
  border: none;
}

button.upDown:hover {
  color: #c74949;
}

button.playPause:hover {
  color: #e61313;
}

button:active {
  /* box-shadow: 0 5px rgb(24, 14, 31); */
  transform: translateY(2px);
}
`;

const makeTicks = (e) => {
    for (let i = 0; i < 12; i++) {
        $(".tick-marks").append(`<div class='tick-${i}'></div>`);
    }
};
makeTicks();

const Timer = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimeOn] = useState(false);
    const [settings, setSettings] = useState(false);

    const increaseTime = () => {
        setTime(time + 300);
    };

    const decreaseTime = () => {
        setTime(time - 300);
    };

    const reset = () => {
        setTime(0);
    };

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
            setTimeOn(false);
            reset();
        }
    }

    return (
        <TimerContainer>
            <div className="Timer">
                {settings === true && (
                    <h3>
                        <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
                    </h3>
                )}

                <div>
                    {!settings && (
                        <button className='start' onClick={() => setSettings(true)}>Timer</button>
                    )}
                </div>

                {time >= 5 && timerOn === false && settings === true && (
                    <button className='upDown' onClick={decreaseTime}><i className="fa-solid fa-minus"></i></button>
                )}
                {timerOn === false && settings === true && (
                    <button className='upDown' onClick={increaseTime}><i className="fa-solid fa-plus"></i></button>
                )}

                <div>
                    {!timerOn && settings && <button className='playPause' onClick={() => setTimeOn(true)}><i className="fa-solid fa-play"></i></button>}
                    {timerOn && <button className='playPause' onClick={() => setTimeOn(false)}><i className="fa-solid fa-pause"></i></button>}
                    {!timerOn && time > 0 && <button className='playPause' onClick={() => reset()}><i className="fa-solid fa-circle-stop"></i></button>}
                </div>
            </div>
        </TimerContainer>
    );
};

export default Timer;
