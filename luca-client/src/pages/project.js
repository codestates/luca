import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Cardboard from "../components/cardboard";

export default function Project() {
  //const projects = useSelector((state) => state.user.projects);

  return (
    <div>
      <Navigator />
      <Canvas />
      <Cardboard />
    </div>
  );
}
