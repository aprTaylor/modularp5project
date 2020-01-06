import p5 from "p5"
import Module from "../../core/module";
import Vector from "../Utility/Vector";


export default class Acceleration extends Vector {
  name = "acceleration"

  constructor (sketch: p5, x = 0, y = 0, limit?: number) {
    super(sketch, x, y, limit);
  }
}
