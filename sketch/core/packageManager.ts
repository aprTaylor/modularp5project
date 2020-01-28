import uuid from "uuid/v4";
import Package from "./package";
import { onEach } from "../utils";
import Graph, { getElementOptions } from "../utils/structures/Graph";
import Module from "./module";
import { forceArray } from "../utils/list";

export type System = (pm: PackageManager) => void
export default class PackageManager {
  //Package id on top, Component name on bottom
  map: Graph<Module>
  systems: Array<System>

  constructor({systems}: {systems: Array<System>}) {
    this.map = new Graph();
    this.systems = systems;
  }

  add (mods: Module[]) {
    const id = uuid();
    this.map.addElementTop(id, mods);
    mods.forEach(mod => this.map.addElementBottom(mod.name, mod));

    return this;
  }

  /** Get modules by package id or get siblings of a mod */
  get (id: string | Module) {
    if (typeof id === 'string') return this.map.getTop(id);

    return this.map.getSiblings(id, 'bottom');
  }

  //TODO: ALLOW MODIFICATION OF ALL MODULES IN A PACKAGE (GET SIBLINGS)
  getByMod (names: string | string[]) {
    const mods = forceArray(names);
    const uMods = new Set<Module>();

    mods.forEach(name => {
      const query:getElementOptions = {level: "bottom", key: name};
      this
        .map
        .get(query)
        .forEach(mod => uMods.add(mod))
    });

    return Array.from(uMods);
  }



  remove (id) {
    //TODO
    //this.map.remove
    return this;
  }

  update () {
    this.systems.forEach(system => system(this));
  }

  
}