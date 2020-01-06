import Module from "../core/module";
import Package from "../core/package"
import p5 from "p5"
import Vector from "./Utility/Vector";


export default class Mouse extends Vector {
  name = "mouse"
  sketch: p5;
  x: number;
  y: number;

  constructor (sketch: p5) {
    super(sketch);
    this.sketch = sketch;
    this.update(null);
  }

  update (pack: Package) {
    this.x = this.sketch.mouseX;
    this.y = this.sketch.mouseY;
  }
}