import p5 from "p5"
import Module from "../../core/module";
import Vector from "../Utility/Vector"


export default class Velocity extends Vector {
  name = "velocity"

  constructor (sketch: p5, x = 0, y = 0, limit?: number) {
    super(sketch, x, y, limit);
  }
}
