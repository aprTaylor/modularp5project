import Module from "../core/module";
import Package from "../core/package"
import p5 from "p5"
import { Draw } from "../core/interface";
import Location from "./Location";


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
    const {location} = pack.getMods();


    if (location instanceof Location){
      this.sketch.ellipse(location.x, location.y, this.width, this.height);
    }
  }

  update (pack: Package) {
    this.draw(pack);
  }
}