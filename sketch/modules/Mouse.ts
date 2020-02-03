import p5 from "p5";
import { without, append } from "ramda"
import Module from "../core/module";
import Package from "../core/package"
import Vector from "./Utility/Vector";

export type mouseEvents = "pressed"

export default class Mouse extends Vector {
  name = "mouse"
  sketch: p5;
  x: number;
  y: number;
  onPressed: (() => void)[];

  constructor (sketch: p5) {
    super(sketch);
    this.sketch = sketch;
    this.onPressed = [];
    this.update(null);
  }

  on (event: mouseEvents, fn: () => void) {
    const appendTo = append(fn);
    switch (event) {
      case "pressed": appendTo(this.onPressed);
    }
  }

  release (event: mouseEvents, fn: () => void) {
    const removeFrom = without([fn])
    switch (event) {
      case "pressed": removeFrom(this.onPressed);
    }
  }

  update (pack: Package) {
    this.x = this.sketch.mouseX;
    this.y = this.sketch.mouseY;
  }
}