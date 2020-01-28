import PackageManager, { System } from "../core/packageManager"
import Line from "../modules/Line";

const Draw : System = (pm: PackageManager) => {

  const mods = pm.getByMod('draw')

  mods.forEach(mod => {
    const siblings = pm.get(mod);

    const { line } = siblings
    
    if (line instanceof Line) {
      pm.sketch.line(line.x1, line.y1, line.x2, line.y2);
    }
  })
}

export default Draw