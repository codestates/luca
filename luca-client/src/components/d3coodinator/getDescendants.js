import { useEffect, useRef } from "react/cjs/react.development";
// import { select, hierarchy, tree, linkVertical } from "d3";
import styled from "styled-components";
import * as d3 from "d3";

const data = {
  id: "4",
  name: "Ymir",
  children: [
    {
      id: "4",
      name: "Eren",
      children: [{ name: "Armin" }, { name: "Erwin" }],
    },
    { name: "Mikasa" },
    {
      name: "Levi",
      children: [
        { name: "Falco" },
        { name: "Ani" },
        {
          children: [
            { name: "Armin" },
            { name: "Erwin" },
            { name: "Armin" },
            { name: "Erwin" },
            { name: "Armin" },
            { name: "Erwin" },
            {
              children: [
                { name: "Armin" },
                { name: "Erwin" },
                { name: "Bertoldt" },
                { name: "Historia" },
                { name: "Armin" },
                {
                  children: [
                    { name: "Armin" },
                    { name: "Erwin" },
                    { name: "Bertoldt" },
                    { name: "Historia" },
                    { name: "Armin" },
                    {
                      children: [
                        { name: "Armin" },
                        { name: "Erwin" },
                        { name: "Bertoldt" },
                        { name: "Historia" },
                        { name: "Armin" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    },
    {
      id: "4",
      name: "Reiner",
      children: [{ name: "Historia" }, { name: "Bertoldt" }, { name: "Sasha" }],
    },
  ],
};


// size 바뀔때마다
// (mapConRef.current.offsetWidth) 를 기준 dimensions로
// descendants 와 links 를 리턴하는 함수형태로 리팩토링할 것

const dimensions = [600, 600];

const rawData = d3.hierarchy(data);

const treeLayout = d3.cluster()
    .size([2 * Math.PI, 200])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)

const root = treeLayout(rawData);

// 모든 노드 배열
let nodes = root.descendants();

// 모든 링크 배열
let links = root.links();

// 링크가 렌더된 컴포넌트
// const LinkagesContainer = styled.div


export { root, nodes, links };
