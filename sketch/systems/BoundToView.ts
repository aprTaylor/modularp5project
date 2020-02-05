import PackageManager, { System } from "../core/packageManager"
import Location from "../modules/Location";

const MoveToMouse : System = (pm: PackageManager) => {

  const mods = pm.getByMod('boundToView');

  mods.forEach(mod => {
    const {location} = pm.get(mod);
    const {width, height} = pm.sketch;
    
    if(
      location instanceof Location
    ) {
      if (location.x > width) {
        location.x = 0;
      } else if (location.x < 0) {
        location.x = width;
      }
   
      if (location.y > height) {
        location.y = 0;
      }  else if (location.y < 0) {
        location.y = height;
      }
    }
  })
}

export default MoveToMouse