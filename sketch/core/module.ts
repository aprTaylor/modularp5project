import p5 from "p5";
import Package from "./package";

export default class Module {
  name = "base"
  readonly sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }

  update (pack: Package) {
    //Update
  }
}