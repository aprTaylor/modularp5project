import { Draw, Module } from "../core/interface";
import Location from "./Location";


export default class Ellipse implements Module {
  name = "ellipse"
  width: number;
  height: number;

  constructor (width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}