import p5 from "p5"
import Vector from "../Utility/Vector";


export default class Acceleration extends Vector {
  name = "acceleration"

  constructor (x = 0, y = 0, limit?: number) {
    super(x, y, limit);
  }
}
