import Canvas from "../components/canvas";
import Canvas2 from "../components/canvas2";
import Canvas3 from "../components/canvas3";
import Cardboard from "../components/cardboard";
import { Navigator } from "../components/commons";

export default function Project() {
  return (
    <div>
      <Navigator />
      <Canvas3 />
      <Cardboard />
    </div>
  );
}
