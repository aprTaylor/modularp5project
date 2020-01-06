import Package from "../core/package";

import Shape from "../modules/Shape";
import Location from "../modules/Location"
import p5 from "p5";

export function Dot (sketch: p5, options = {width: 100, height: 100, x: 0, y: 0}) {
  const {width, height, x, y} = options
  return new Package([
    new Shape(sketch, 'ellipse', width, height),
    new Location(sketch, x, y)
  ])
}