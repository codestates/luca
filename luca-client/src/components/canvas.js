import * as d3 from "d3";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { hierarchy, tree } from "d3";

export default function Canvas() {
  const data =  useSelector((state) => state.user.mindmapTree);

  const Frame = styled.div`
    width: 100%;
    height: 100%;
    background-color: lightsalmon;
    /* border: solid red 3px; */
    text-align: center;
    overflow: hidden;
  `;
  const MapContainer = styled.div`
    position: relative;
    background-color: lightgrey;
    top: 0;
    left: 0;
    width: ${(props) => 200 / props.viewRatio}%;
    height: ${(props) => 200 / props.viewRatio}%;
    transform: scale(${(props) => props.viewRatio});
    transform-origin: left top; // todo: 커서위치 props로 줄 것
    text-align: left;
    > svg {
    }
  `;

  const drag = (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  const canvasRef = useRef();

  useEffect(() => {
    const dimensions = [600, 600];
    const root = hierarchy(data);
    const treeLayout = tree()
    .size(dimensions)
    .separation((a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth);
    treeLayout(root);

    let nodes = root.descendants();
    let links = root.links();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .selectAll(".page")
      .append("svg")
      .attr("viewBox", [-100, -50, 200, 100]);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", (d) => (d.children ? null : "#000"))
      .attr("stroke", (d) => (d.children ? null : "#fff"))
      .attr("r", 2)
      .call(drag(simulation));


    const content = svg
      .append("g")
      .selectAll("title")
      .data(nodes)
      .join("title")
      .text((d) => d.data.content)
      .attr("dy", ".31em")
      .style("text-anchor", "middle")
      .attr("r", 2)
      .call(drag(simulation));

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      content.attr("cx", (d) => d.x + 10).attr("cy", (d) => d.y);
    });
  });

  return (
    <Frame>
      <MapContainer ref={canvasRef} >
        <div className="page"></div>
      </MapContainer>
    </Frame>
  );
}