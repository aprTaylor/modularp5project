import PackageManager, { System } from "../core/packageManager"
import Acceleration from "../modules/Physics/Acceleration";
import Velocity from "../modules/Physics/Velocity";
import Location from "../modules/Location";
import { Vector } from "p5";
import mouseVector from "../utils/p5";

const MoveToMouse : System = (pm: PackageManager) => {

  const mods = pm.getByMod('moveToMouse');

  mods.forEach(mod => {
    const {acceleration, velocity, location} = pm.get(mod);
    
    if(
      acceleration instanceof Acceleration && 
      velocity instanceof Velocity &&
      location instanceof Location
    ) {
      const locVec = location.toVector(pm.sketch);
      const dir = Vector
        .sub(mouseVector(pm.sketch), locVec)
        .normalize()
        .mult(0.5);

      acceleration.fromVector(dir);
      velocity.add(pm.sketch, acceleration);
      location.add(pm.sketch, velocity);
    }
  })
}

export default MoveToMouse