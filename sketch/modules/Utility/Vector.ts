import p5 from "p5"
import Module from "../../core/module";
import { IsVector } from "../../core/interface";

p5.Vector

export default class Vector extends Module {
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

    this.fromVector(this.toVector().add(x, y));

    return this;
  }

  /* Subtract another 2D vector  */
  sub(obj: {x: number, y: number}, y?: number): this 
  sub(x: number, y: number): this
  sub(x: number | any, y?: number): this {
    if(typeof x != "number") {
      y = x.y;
      x = x.x;
    }  

    this.fromVector(this.toVector().sub(x, y));

    return this;
  }


  /* Multiply vector by a constant */
  mult(x: number): this {
    this.fromVector(this.toVector().mult(x));

    return this;
  }

  /* Set vector from p5 vector. Will limit if limit is set.*/
  fromVector (vec: p5.Vector) {
    const fromVec = vec.copy();

    if (this.limit) fromVec.limit(this.limit);
    this.x = fromVec.x;
    this.y = fromVec.y;

    return this;
  }



  /** Cast to a vector. Auto limits vector if limit is specified */
  toVector () {
    let vec = this.sketch.createVector(this.x, this.y);
    if(this.limit) vec.limit(this.limit);
    return vec;
  }
}
