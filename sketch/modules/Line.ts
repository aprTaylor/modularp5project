import { Module } from "../core/interface";
import Package from "../core/package"
import p5 from "p5"
import { Draw } from "../core/interface";


export default class Line implements Module {
  name = "line"
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor (x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  /*
  draw () {
    this.sketch.line(this.x1, this.y1, this.x2, this.y2);
    
  }*/
}