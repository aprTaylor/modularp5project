import p5, {Vector} from "p5"
import Module from "../../core/module";
import Package from "../../core/package";
import Mouse from "../Mouse";
import Acceleration from "./Acceleration";
import Velocity from "./Velocity";
import Location from "../Location"
import mouseVector from "../../utils/p5";


export default class MoveToMouse extends Module {
  name = "moveToMouse"

  constructor (sketch: p5) {
    super(sketch);
  }

  update (pack: Package) {
    const {acceleration, velocity, location} = pack.getMods();

    if(
      acceleration instanceof Acceleration && 
      velocity instanceof Velocity &&
      location instanceof Location
    ) {
      const locVec = location.toVector();
      const dir = Vector
        .sub(mouseVector(this.sketch), locVec)
        .normalize();

      acceleration.fromVector(dir);
      velocity.add(acceleration);
      location.add(velocity);
    }

  }

}
