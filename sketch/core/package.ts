import Module from "./module";
import uuid from "uuid/v4"


export default class Package {
  modules: Record<string, Module>;
  readonly id: string;
  x = 0;
  y = 0;

  constructor (modules: Module[] = [], options?: {x?: number, y?: number}) {
    this.id = uuid();
    this.modules = {};
    this.add(modules);

    //load init options
    if(options)
      Object
        .keys(options)
        .forEach((option: keyof typeof options) => this[option] = options[option])
  }

  add (mod?: Module | Module[]) {
    if (mod) {
      if (!Array.isArray(mod)) mod = [mod];
      mod.forEach(mod => this.modules[mod.name] = mod);
    }
    return this;
  }

  remove (name: string) {
    delete this.modules[name];
    return this;
  }

  get (name: string) {
    return this.modules[name];
  }

  update () {
    Object
      .keys(this.modules)
      .forEach(key => {
        this.modules[key].update(this)
      })
  }
}