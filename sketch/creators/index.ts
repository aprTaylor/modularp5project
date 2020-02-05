import Package from "../core/package";

import Shape from "../modules/Ellipse";
import Location from "../modules/Location"
import p5 from "p5";
import Ellipse from "../modules/Ellipse";

export function Dot (sketch: p5, options = {width: 100, height: 100, x: 0, y: 0}) {
  const {width, height, x, y} = options
  return [
    new Ellipse(width, height),
    new Location(x, y)
  ]
}