import * as d3 from 'd3';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';

export default function Canvas() {

  const Background = styled.div `
    background-color: silver;
    width: 100%;
    height: 100vh;
  `
  const Canvas = styled.div`
    border: solid;
    border-color: red;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    > svg {
      /* width: 100%;
      height: 100%; */
    }
  `

  const canvasRef = useRef();
  const svgRef = useRef();
  const [data, setData] = useState(
    {
      content: "Zog",
      children:[
        {
        content: "Bean",
        children:[
          {content: "Elfo"},
          {content: "Lucy"}
        ]
        },
        {
          content: "Degma"
        }
      ]
    }
  )
  const root = d3.hierarchy(data);

  useEffect(()=>{
    const svg = d3.select(svgRef.current);
    // const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    // const svg = d3.create("svg")
    // .attr("viewBox", [-300 / 2, -400 / 2, 400, 400]);

    const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line");

    const node = svg.append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("fill", d => d.children ? null : "#000")
      .attr("stroke", d => d.children ? null : "#fff")
      .attr("r", 5)
      .call(d3.drag(simulation));

      node.append("title")
      .text(d => d.data.content);

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });

  }, [data])
  

return (
  <Background>
    <Canvas ref={canvasRef}>
      <svg ref={svgRef} viewBox="-60 60 -60 60">
        {
          console.log(root)
        }
      </svg>
    </Canvas>
  </Background>
  )
}
