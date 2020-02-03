import p5 from "p5"
import Package from "../../core/package";
import Module from "../../core/module";
import Mouse from "../Mouse";
import Force from "../Physics/Force";


export default class WindOnClick extends Module {
  name = "windOnClick"

  constructor (sketch: p5) {
    super(sketch);
  }

  /*
  init (pack: Package) {
    const { mouse, force } = pack.getMods();

    if (mouse instanceof Mouse && force instanceof Force) {
      mouse.on("pressed", () => {
        const wind = this.sketch.createVector(0.5, 0);
        force.apply(pack, wind);
      })
    }
    else {
      console.warn("windOnClick is missing modules");
    }
  }*/
}