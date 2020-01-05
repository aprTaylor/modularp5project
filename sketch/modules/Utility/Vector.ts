import p5 from "p5"
import Module from "../../core/module";
import { IsVector } from "../../core/interface";

p5.Vector

export default class Vector extends Module implements IsVector {
  name = "vector"
  x: number
  y: number
  limit?: number

  constructor (sketch: p5, x = 0, y = 0, limit?: number) {
    super(sketch);
    this.x = x;
    this.y = y;
    this.limit = limit;
  }


  /* Add another 2D vector  */
  add(obj: {x: number, y: number}, y?: number): this 
  add(x: number, y: number): this
  add(x: number | any, y?: number): this {
    if(typeof x != "number") {
      y = x.y;
      x = x.x;
    }  

    this.x += x;
    this.y += y;
    return this;
  }

  /** Cast to a vector. Auto limits vector if limit is specified */
  toVector () {
    let vec = this.sketch.createVector(this.x, this.y);
    if(this.limit) vec.limit(this.limit);
    return vec;
  }
}
