import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Canvas2 from "../components/canvas2";
import Canvas3 from "../components/canvas3";
import Cardboard from "../components/cardboard";

export default function Project() {
  //const projects = useSelector((state) => state.user.projects);

  return (
    <div>
      {/* <Navigator /> */}
      <Canvas3 />
      <Cardboard />
    </div>
  );
}
