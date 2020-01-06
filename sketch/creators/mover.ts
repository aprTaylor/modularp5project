import Package from "../core/package";
import p5 from "p5";
import Velocity from "../modules/Physics/Velocity";
import Acceleration from "../modules/Physics/Acceleration";
import Location from "../modules/Location"
import { withDefault } from "../utils";
import Shape from "../modules/Shape";
import MoveToMouse from "../modules/Physics/MoveToMouse";
import Mouse from "../modules/Mouse";
import BoundToView from "../modules/View/BoundToView";
import Force from "../modules/Physics/Force";
import WindOnClick from "../modules/Sim/WindOnClick";

export type OptionProps = {
  velocity?: [number, number, number?], 
  acceleration?: [number, number, number?]
}
export default function Mover (sketch: p5, options?: OptionProps) {
  return new Package([
    new Velocity(sketch, ...withDefault(options?.velocity, [0, 0, 4])),
    new Acceleration(sketch, ...withDefault(options?.acceleration, [0, 0])),
    new Location(sketch, sketch.random(sketch.width), sketch.random(sketch.height)),
    new MoveToMouse(sketch),
    new BoundToView(sketch),
    new Shape(sketch, "ellipse", 16, 16),
    new WindOnClick(sketch),
    new Force(sketch)
  ])
}