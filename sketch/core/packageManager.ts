import Package from "./package";
import { onEach } from "../utils";

export default class PackageManager {
  packages!: Record<string, Package>;

  constructor(packages: Record<string, Package> = {}) {
    this.packages = packages;
  }

  add (pack: Package) {
    this.packages[pack.id] = pack;
    return this;
  }

  remove (pack: Package) {
    delete this.packages[pack.id];
    return this;
  }

  update () {
    onEach(this.packages, key => this.packages[key].update())
    return this;
  }

  draw () {
    onEach(this.packages, key => this.packages[key].draw())
    return this;
  }

  mousePressed () {
    onEach(this.packages, key => this.packages[key].mousePressed())
    return this;
  }
}