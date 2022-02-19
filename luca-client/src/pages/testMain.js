import React from "react";
import { NavLink } from "react-router-dom";


export default function Test() {
    return (
        <div>
            <h1>Project</h1>
            <button>
                <NavLink to="/test/project/1">1번 프로젝트 입장</NavLink>
            </button>
            <button>
                <NavLink to="/test/project/2">2번 프로젝트 입장</NavLink>
            </button>
        </div>
    );
}