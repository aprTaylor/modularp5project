import PackageManager, { System } from "../core/packageManager"
import Line from "../modules/Line";
import Ellipse from "../modules/Ellipse";
import Location from "../modules/Location";

const Draw : System = (pm: PackageManager) => {

  const mods = pm.getByMod('draw');

  mods.forEach(mod => {
    const siblings = pm.get(mod);

    const { line, ellipse, location } = siblings

    if (
      ellipse instanceof Ellipse && 
      location instanceof Location
      ) {
      pm.sketch.ellipse(location.x, location.y, ellipse.width, ellipse.height);
    }
    
    if (line instanceof Line) {
      pm.sketch.line(line.x1, line.y1, line.x2, line.y2);
    }
  })
}

export default Draw