
import p5 from "p5";
import Velocity from "../modules/Physics/Velocity";
import Acceleration from "../modules/Physics/Acceleration";
import Location from "../modules/Location"
import { withDefault } from "../utils";
import Ellipse from "../modules/Ellipse";
import Tags from "../Tags"

export type OptionProps = {
  velocity?: [number, number, number?], 
  acceleration?: [number, number, number?]
  location?: [number, number]
}
/**
 * Moves across the screen
 * @export
 * @param {p5} sketch
 * @param {OptionProps} [options] {velocity: [x, y, limit?], acceleration: [x, y, limit?]}
 * @returns
 */
export default function Mover (sketch: p5, options?: OptionProps) {
  return [
    new Velocity(...withDefault(options?.velocity, [0, 0, 4])),
    new Acceleration(...withDefault(options?.acceleration, [0, 0])),
    new Location(...withDefault(options?.location, [sketch.random(sketch.width), sketch.random(sketch.height)])),
    new Ellipse(16, 16),
    Tags.boundToView,
    Tags.draw,
    Tags.moveToMouse
    //new WindOnClick(sketch),
    //new Force()
  ]
}