import p5 from "p5"
import Module from "../../core/module";
import Package from "../../core/package";
import Location from '../Location'


/** Bounds Location to viewport
 * Required modules: Location
 */
export default class BoundToView extends Module {
  name = "boundToView"

  constructor (sketch: p5) {
    super(sketch);
  }

  update(pack: Package) {
    const {location} = pack.getMods();
    const {width, height} = this.sketch;

    if (location instanceof Location) {
      if (location.x > width) {
        location.x = 0;
      } else if (location.x < 0) {
        location.x = width;
      }
   
      if (location.y > height) {
        location.y = 0;
      }  else if (location.y < 0) {
        location.y = height;
      }
    }
    else {
      console.warn("BoundToView is missing modules.");
    }
  }
}
