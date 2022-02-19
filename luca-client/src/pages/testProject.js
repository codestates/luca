import { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate } from 'react-router-dom';


export default function Project() {
    const navigate = useNavigate();
    const [socketIo, setSocketIO] = useState();
    const roomName = window.location.pathname.substring(14);
    const socket = io.connect("http://127.0.0.1:80")
    const disconnectSocket = useCallback(() => {
        socket.on("bye", () => {
            console.log('bye')
        })
        socket.disconnect();
    }, [socket]);

    const goToBack = async () => {
        socketIo.disconnect();
        navigate("/test");
    }

    // 처음 입장할 때만 소켓 연결해준다.
    useEffect(() => {
        setSocketIO(socket);
        socket.emit("Enter_Room", roomName)
        socket.on("Enter_Room", (data, count) => {
            console.log(`Number of participants: ${count}`)
            console.log("SOCKETIO connect EVENT: ", data, " client connect");
        })
    }, []);

    // 뒤로 가기를 하면 소켓 연결이 끊어진다.
    useEffect(() => {
        return () => {
            disconnectSocket();
        };
    }, []);

    socket.on('new_disconnect', function (data) {
        console.log("SOCKETIO disconnect EVENT: ", data, " client connect");
    });

    // 입력한 메세지를 다른 사람에게 보여준다.
    function sendData() {
        const inputData = document.getElementById('data').value;
        socket.emit("Send_Server", `${inputData}`, roomName)
        socket.on("Send_Client", (data) => {
            console.log(data)
        })
    }

    return (
        <div>
            <header>
                <h1>
                    Room NO. {roomName}
                </h1>
            </header>
            <header>
                <input id='data'></input>
                <button onClick={sendData}>send</button>
                <button onClick={goToBack}>exit</button>
            </header>
        </div>
    );
}