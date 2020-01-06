import p5, {Vector} from "p5"
import Module from "../../core/module";
import Package from "../../core/package";
import Mouse from "../Mouse";
import Acceleration from "./Acceleration";
import Velocity from "./Velocity";
import Location from "../Location"
import mouseVector from "../../utils/p5";


/** Accumulates forces into acceleration. 
 * Use after modules that exert force! Update will clear acceleration.
 * 
 * Required Modules: Acceleration */
export default class Force extends Module {
  name = "force"

  constructor (sketch: p5) {
    super(sketch);
  }


  /** Add force to acceleration */
  apply(pack: Package, obj: {x: number, y: number}): this 
  apply(pack: Package, x: number, y: number): this
  apply(pack: Package, x: number | any, y?: number): this { 
    if(typeof x != "number") {
      y = x.y;
      x = x.x;
    }

    (pack.get("acceleration") as Acceleration).add(x, y);    
    
    return this;
  }

  update (pack: Package) {
    const {acceleration} = pack.getMods();

    if(
      acceleration instanceof Acceleration
    ) {
      acceleration.mult(0);
    }
    else {
      console.warn("Force is missing modules.")
    }

  }

}
