import p5, {Vector} from "p5"
import { Module } from "../../core/interface"


/** Accumulates forces into acceleration. 
 * Use after modules that exert force! Update will clear acceleration.
 * 
 * Required Modules: Acceleration */
export default class Force implements Module {
  name = "force"

  constructor () {
  }


  /** Add force to acceleration */
  /*
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

  }*/

}
