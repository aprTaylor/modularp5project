import Module from "../core/module";
import Package from "../core/package"
import p5 from "p5"
import { Draw } from "../core/interface";
import Mouse from "./Mouse";
import Line from "./Line";


export default class LineToMouse extends Module {
  name = "lineToMouse"

  constructor (sketch: p5) {
    super(sketch);
  }

  update (pack: Package) {
    const mods = pack.modules;

    if(mods.line instanceof Line && mods.mouse instanceof Mouse) {
      const {line, mouse} = mods;
      //const mouseVec = this.sketch.createVector(mouse.x, mouse.y);
      //const centerVec = this.sketch.createVector(line.x1/2, line.y1/2);

      //mouseVec.sub(centerVec);
      //this.sketch.translate(this.sketch.width/2, this.sketch.height/2);

      line.x2 = mouse.x;
      line.y2 = mouse.y;

      line.draw();
    }
  }
}