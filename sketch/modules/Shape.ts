import Module from "../core/module";
import Package from "../core/package"
import p5 from "p5"
import { Draw } from "../core/interface";


export default class Shape extends Module implements Draw{
  name = "shape"
  shape: string;
  width: number;
  height: number;

  constructor (sketch: p5, shape: string, width: number, height: number) {
    super(sketch);
    this.shape = shape;
    this.width = width;
    this.height = height;
  }

  draw (pack?: Package) {
    this.sketch.ellipse(pack?.x || 0, pack?.y || 0, this.width, this.height);
  }

  update (pack: Package) {
    this.draw(pack);
  }
}