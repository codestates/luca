import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import io from "socket.io-client";

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
    }`
    ;

const Timer = () => {
    const curProjectId = window.location.href.split("/").reverse()[0]
    const socket = io.connect(`${process.env.REACT_APP_API_URL}`)
    const roomName = `${curProjectId}`
    const [time, setTime] = useState(0);
    const [timerOn, setTimeOn] = useState(false);
    const [settings, setSettings] = useState(false);

    const increaseTime = () => socket.emit("increaseTime", time, roomName);
    const decreaseTime = () => socket.emit("decreaseTime", time, roomName);
    const clickTimer = () => socket.emit("clickTimer", true, roomName);
    const startTimer = () => socket.emit("startTimer", true, roomName);
    const pauseTimer = () => socket.emit("pauseTimer", false, roomName);
    const resetTimer = () => {
        setTime(0);
        socket.emit("resetTimer", false, roomName);
    };

    useEffect(() => {
        socket.emit("enterRoom", roomName);
    }, []);

    useEffect(() => {
        socket.on("increaseTime", (data) => setTime(data + 300));
        socket.on("decreaseTime", (data) => setTime(data - 300));
        socket.on("clickTimer", (data) => setSettings(data));
        socket.on("startTimer", (data) => setTimeOn(data));
        socket.on("pauseTimer", (data) => setTimeOn(data));
        socket.on("resetTimer", (data) => {
            setSettings(data);
            setTime(0);
        });
    }, [])

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
            resetTimer();
        }
    }

    return (
        <div>
            <TimerImage>
                <div>
                    {!settings && (
                        <button className='start' onClick={() => clickTimer()}><i className="fa-solid fa-clock"></i></button>
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
                            <button className='upDown' onClick={decreaseTime}><i className="fa-solid fa-minus"></i></button>
                        )}
                        {timerOn === false && settings === true && (
                            <button className='upDown' onClick={increaseTime}><i className="fa-solid fa-plus"></i></button>
                        )}
                    </div>

                    <div>
                        {!timerOn && settings && time >= 5 && <button className='playPause' onClick={() => startTimer()}><i className="fa-solid fa-play"></i></button>}
                        {timerOn && <button className='playPause' onClick={() => pauseTimer()}><i className="fa-solid fa-pause"></i></button>}
                        {!timerOn && time > 0 && <button className='playPause' onClick={() => resetTimer()}><i className="fa-solid fa-circle-stop"></i></button>}
                    </div>
                </div>
            </TimerDisplay>
        </div>

    );
};

export default Timer;