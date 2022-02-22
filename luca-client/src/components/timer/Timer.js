import "./Timer.css";
import $ from "jquery";
import { useState, useEffect } from "react";
import Numscrubber from "numscrubberjs";

const makeTicks = (e) => {
    for (let i = 0; i < 12; i++) {
        $(".tick-marks").append(`<div class='tick-${i}'></div>`);
    }
};
makeTicks();

const Timer = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimeOn] = useState(false);
    const [userInput, setInput] = useState(0);
    const [movingDegrees, setDegrees] = useState(270);
    const [settings, setSettings] = useState(false);

    Numscrubber.init();

    var secondHand = document.querySelector(".second");

    const startCount = () => {
        console.log(movingDegrees);
        setDegrees(movingDegrees - 6);
        console.log(movingDegrees);
        secondHand.style.transform = `rotate(${movingDegrees - 6}deg)`;
    };

    const handleChange = (event) => {
        if (!timerOn) {
            setTime(event.target.value);
            setInput(event.target.value);
        }
    };

    const increaseTime = () => {
        setTime(time + 5);
        if (movingDegrees > 360) {
            setDegrees(0);
        }
        setDegrees(movingDegrees + 30);
        secondHand.style.transform = `rotate(${movingDegrees + 30}deg)`;
    };

    const decreaseTime = () => {
        setTime(time - 5);
        if (movingDegrees <= 0) {
            setDegrees(360);
        }
        setDegrees(movingDegrees - 30);
        secondHand.style.transform = `rotate(${movingDegrees - 30}deg)`;
    };

    const reset = () => {
        setTime(0);
        setDegrees(270);
        secondHand.style.transform = `rotate(${270}deg)`;
    };

    useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                if (time > 0) {
                    setTime((prevTime) => prevTime - 1);
                }
                startCount();
            }, 1000);
        } else {
            clearInterval(interval, movingDegrees);
        }
        return () => clearInterval(interval, movingDegrees);
    }, [timerOn, movingDegrees]);

    if (timerOn) {
        if (time <= 0) {
            setTimeOn(false);
            reset();
        }
    }

    if (settings) {
        if (time <= 0) {
            secondHand.style.transform = `rotate(${270}deg)`;
        }
    }

    return (
        <div className="App">
            <div className="timer-wrapper">
            </div>
            <div id="clock">
                <div className="second hand">
                    <div className="circle"></div>
                </div>

                <div className="mark three"></div>
                <div className="mark six"></div>
                <div className="mark nine"></div>
                <div className="mark twelve"></div>

                <div className="tick-marks"></div>
            </div>

            {/* <div className="wrapper">
        <div id="clock">
        </div>
      </div> */}

            {settings === true && (
                <h3>
                    <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
                </h3>
            )}

            {/* <form>
        <label>
          <input
            type="number"
            value={userInput}
            onChange={handleChange}
            min="0"
            max="3599"
          />
        </label>
      </form> */}

            <div>
                {!settings && (
                    <button onClick={() => setSettings(true)}>Timer</button>
                )}
            </div>

            {time >= 5 && timerOn === false && settings === true && (
                <button className='upDown' onClick={decreaseTime}><i class="fa-solid fa-minus"></i></button>
            )}
            {timerOn === false && settings === true && (
                <button className='upDown' onClick={increaseTime}><i class="fa-solid fa-plus"></i></button>
            )}

            <div>
                {!timerOn && settings && <button className='playPause' onClick={() => setTimeOn(true)}><i class="fa-solid fa-play"></i></button>}
                {timerOn && <button className='playPause' onClick={() => setTimeOn(false)}><i class="fa-solid fa-pause"></i></button>}
                {/* {!timerOn && time !== 0 && time !== setInput && (
          <button onClick={() => setTimeOn(true)}>Resume</button>
        )} */}
                {!timerOn && time > 0 && <button className='playPause' onClick={() => reset()}><i class="fa-solid fa-circle-stop"></i></button>}
            </div>
        </div>
    );
};

export default Timer;