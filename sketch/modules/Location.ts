import p5 from "p5"
import Vector from "./Utility/Vector";


export default class Location extends Vector {
  name = "location"

  constructor (sketch: p5, x = 0, y = 0, limit?: number) {
    super(sketch, x, y, limit);
  }
}
