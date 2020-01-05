import Package from "../core/package";
import p5 from "p5";
import Velocity from "../modules/Movement/Velocity";
import Acceleration from "../modules/Movement/Acceleration";
import { withDefault } from "../utils";

export type OptionProps = {
  velocity?: [number, number], 
  acceleration?: [number, number]
}
export default function Mover (sketch: p5, options?: OptionProps) {
  return new Package([
    new Velocity(sketch, ...withDefault(options?.velocity, [0, 0])),
    new Acceleration(sketch, ...withDefault(options?.acceleration, [0, 0]))
  ], 
  {
    x: sketch.random(sketch.width),
    y: sketch.random(sketch.height)
  })
}