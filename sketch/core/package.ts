import Module from "./module";
import uuid from "uuid/v4"


export default class Package {
  modules: Map<string, Module>;
  readonly id: string;

  constructor (modules: Module[] = [], options?: {}) {
    this.id = uuid();
    this.modules = new Map();
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
      mod.forEach((mod) => this.modules.set(mod.name, mod));
    }
    return this;
  }

  remove (name: string) {
    delete this.modules[name];
    return this;
  }

  get (name: string) {
    return this.modules.get(name);
  }

  update () {
    this.modules
      .forEach((mod, key) => {
        this.modules.get(key).update(this)
      })
  }

  getMods () {
    const obj: Record<string, Module> = {};
    this.modules.forEach ((v,k) => { obj[k] = v });
    return obj;
  }
  

  draw () {
    //For children to implement
  }
}