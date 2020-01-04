import Package from "../core/package";

import Shape from "../modules/Shape";

export function Dot (sketch: p5, options = {width: 100, height: 100, x: 0, y: 0}) {
  const {width, height, x, y} = options
  return new Package("dot", [new Shape(sketch, 'ellipse', width, height)], {x, y})
}