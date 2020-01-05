import p5 from "p5"
import Module from "../../core/module";
import { IsVector } from "../../core/interface";


export default class Velocity extends Module implements IsVector {
  name = "velocity"
  x: number
  y: number
  limit?: number

  constructor (sketch: p5, x = 0, y = 0, limit?: number) {
    super(sketch);
    this.x = x;
    this.y = y;
    this.limit = limit;
  }


  /** Cast to a vector. Auto limits vector if limit is specified */
  toVector () {
    let vec = this.sketch.createVector(this.x, this.y);
    if(this.limit) vec.limit(this.limit);
    return vec;
  }
}
