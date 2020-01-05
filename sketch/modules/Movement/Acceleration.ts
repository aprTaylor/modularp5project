import p5 from "p5"
import Module from "../../core/module";


export default class Acceleration extends Module {
  name = "acceleration"
  x: number
  y: number

  constructor (sketch: p5, x = 0, y = 0) {
    super(sketch);
    this.x = x;
    this.y = y;
  }
}
