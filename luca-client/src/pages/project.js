import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Canvas2 from "../components/canvas2";
import Canvas3 from "../components/canvas3";
import Cardboard from "../components/cardboard";

export default function Project() {
  //const projects = useSelector((state) => state.user.projects);
  let dummyCardlist = [
    { id: 0, content: "lorem ipsum" },
    { id: 1, content: "dolor sit amet" },
    { id: 2, content: "consectetur adipiscing elit" },
    { id: 3, content: "sed do eiusmod tempor" },
    { id: 4, content: "incididunt ut labore et dolore" },
    { id: 5, content: "magna aliqua" },
    { id: 6, content: "ut enim ad minim veniam" },
    { id: 7, content: "quis nostrud exercitation ullamco" },
    { id: 8, content: "laboris nisi ut aliquip ex ea commodo consequat" },
    { id: 9, content: "duis aute irure dolor in reprehenderit" },
    { id: 10, content: "excepteur sint" },
    { id: 11, content: "occaecat cupidatat" },
    { id: 12, content: "non proident" },
    { id: 13, content: "sunt in culpa qui" },
    { id: 14, content: "officia deserunt" },
    { id: 15, content: "mollit anim id" },
    { id: 16, content: "est laborum" },
  ];

  return (
    <div>
      {/* <Navigator /> */}
      <Canvas3 />
      <Cardboard cardData={dummyCardlist} />
    </div>
  );
}
