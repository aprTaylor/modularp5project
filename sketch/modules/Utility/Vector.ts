import p5 from "p5"
import { IsVector, Module } from "../../core/interface";

p5.Vector

export default class Vector implements Module {
  name = "vector"
  x: number
  y: number
  limit?: number

  constructor (x = 0, y = 0, limit?: number) {
    this.x = x;
    this.y = y;
    this.limit = limit;
  }


  /* Add another 2D vector  */
  add(sketch: p5, obj: {x: number, y: number}, y?: number): this 
  add(sketch: p5, x: number, y: number): this
  add(sketch: p5, x: number | any, y?: number): this {
    if(typeof x != "number") {
      y = x.y;
      x = x.x;
    }  

    this.fromVector(this.toVector(sketch).add(x, y));

    return this;
  }

  /* Subtract another 2D vector  */
  sub(sketch: p5, obj: {x: number, y: number}, y?: number): this 
  sub(sketch: p5, x: number, y: number): this
  sub(sketch: p5, x: number | any, y?: number): this {
    if(typeof x != "number") {
      y = x.y;
      x = x.x;
    }  

    this.fromVector(this.toVector(sketch).sub(x, y));

    return this;
  }


  /* Multiply vector by a constant */
  mult(sketch: p5, x: number): this {
    this.fromVector(this.toVector(sketch).mult(x));

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
  toVector (sketch: p5) {
    let vec = sketch.createVector(this.x, this.y);
    if(this.limit) vec.limit(this.limit);
    return vec;
  }
}
