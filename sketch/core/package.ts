import Module from "./module";


export default class Package {
  modules: Record<string, Module>;
  id: string;
  x = 0;
  y = 0;

  constructor (id: string, modules: Module[] = [], options?: {x?: number, y?: number}) {
    this.id = id;
    this.modules = modules.reduce((acc, mod) => {
      acc[mod.name] = mod;
      return acc;
    }, ({} as any));

    //load init options
    if(options)
      Object
        .keys(options)
        .forEach((option: keyof typeof options) => this[option] = options[option])
  }

  add (mod: Module) {
    this.modules[mod.name] = mod;
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