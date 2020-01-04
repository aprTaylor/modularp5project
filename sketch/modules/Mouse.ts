import Module from "../core/module";
import Package from "../core/package"
import p5 from "p5"


export default class Mouse extends Module {
  name = "mouse"
  shape: string;
  sketch: p5;
  x: number;
  y: number;

  constructor (sketch: p5) {
    super(sketch);
    this.update(null);
  }

  update (pack: Package) {
    this.x = this.sketch.mouseX;
    this.y = this.sketch.mouseY;
  }
}