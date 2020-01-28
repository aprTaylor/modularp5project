//import Module from "./module";
import uuid from "uuid/v4"


export default class Package {
  /*modules: Map<string, Module>;
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

      //Init new modules
      mod.forEach(mod => mod.init(this));
    }
    return this;
  }

  remove (name: string) {
    this.modules.delete(name);
    return this;
  }

  get (name: string) {
    return this.modules.get(name);
  }

  update () {
    onEach(this.modules, mod => mod.update(this))
  }

  // Returns modules as object 
  getMods (): Record<string, Module> {
    const obj = {};
    for (let [key, value] of this.modules) {
      obj[key] = value;
    }
    return obj;
  }

   /////////////////////////////////////////////////////////////////
  //// INTERACTION ////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////
  mousePressed () {
    //onEach(this.modules, mod => mod.mousePressed())
  }
  

  draw () {
    //For children to implement
  }*/
}

function onEach<K, V> (map: Map<K, V>, fn: (item: V) => void) {
  map
    .forEach((mod, key) => {
      fn(mod);
    })
} 