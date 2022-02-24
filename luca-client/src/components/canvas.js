import * as d3 from "d3";
import styled from "styled-components";
import { useState, useRef, useEffect, Component } from "react";
import { root, nodes, links } from "./d3coodinator/getDescendants";
import { useSelector, useDispatch } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Container = styled.div`
  margin-top: 10vh;
  width: 90vw;
  height: 90vh;
  border: solid red 1px;
`;

const Controller = styled.div`
  position: fixed;
  bottom: 3vh;
  width: 10vh;
  height: 10vh;
  background: cyan;
`;

export default function Canvas() {

  const svgRef = useRef();
  const titleRef = useRef();
  const lineRef = useRef();

  const handleClick  = (el) => {
    console.log("CLiCKeD!!!!!!!!!!!!")
    console.log(el)
  }

  useEffect(() => {
  const svg = d3.selectAll("svg")
    .attr("width", "90%")
    .attr("height", "90%")
    .attr("viewBox", [-400, -300, 800, 600]);

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y));
  
  svg.append("g")
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
      `)
      .on("click", (d) => {handleClick(d)})
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90}) 
        translate(${d.y},0) 
        rotate(${d.x >= Math.PI ? 180 : 0})
      `)
      .on("click", d => {handleClick(d)}) ////////////////////////onClick
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .text(d => d.data.name)
    .clone(true).lower()
      .attr("stroke", "white");

  }, [])
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <Controller />
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
            {/* {console.log(links, nodes, svgRef.current)} */}
            <Container>
              <svg></svg>
            </Container>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}
