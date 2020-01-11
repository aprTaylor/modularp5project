import { without } from 'ramda'

export class oneWayNode<T> {
  to: twoWayNode<T>[];

  add (node: twoWayNode<T>) {
    this.to.push(node);
    return this;
  }

  remove (node: twoWayNode<T>) {
   this.to = without([node], this.to);
   return this;
  }
}

type Level = "top" | "bottom"
export class twoWayNode<T> {
  element: T
  top: oneWayNode<T>[]
  bottom: oneWayNode<T>[]

  constructor (item: T) {
    this.element = item;
  }

  add(end: Level, node: oneWayNode<T>) {
    switch(end){
      case "top": this.top.push(node); break;
      case "bottom": this.bottom.push(node); break;
    }

    return this;
  }

  remove(end: Level, node: oneWayNode<T>) {
    switch(end){
      case "top": this.top = without([node], this.top); break;
      case "bottom": this.bottom = without([node], this.bottom); break;
    }

    return  this;
  }

  /** Remove all references to this node in graph and its references */
  delete () {
    this.top.forEach(node => {
      node.remove(this);
    });
    this.bottom.forEach(node => {
      node.remove(this);
    });

    this.element = null;
    this.bottom = null;
    this.top = null;
  }


}


type addElementOptions<T> = {level: Level, key: string, element: T};
type getElementOptions = {level: Level, key: string};
/**
 * A double entry graph. Two maps are specified, a top and a bottom.
 * Each element in both maps are Nodes.
 * 
 * This provides us a quick way to access objects from different contexts.
 * Adding, and finding are quick. Removing is slow. 
 */
export default class Graph<T> {
  top: Record<string, oneWayNode<T>>
  bottom: Record<string, oneWayNode<T>>

  constructor () {
    this.top = {};
    this.bottom = {};
  }

  private validateKey (key: string, obj: Record<string, oneWayNode<T>>, suppressWarn = false) {
    if (obj[key]) {
      !suppressWarn && console.warn(key, "is already present in graph. Overriding key...");
      return false;
    }

    return true;
  }

  private validateElement (key: string, obj: Record<string, oneWayNode<T>>, suppressWarn = false) {
    if (!obj[key]) {
      !suppressWarn && console.warn(key, "is not present in graph. Cannot add to graph.");
      return false;
    }

    return true;
  }


  addTop (key: string, suppressWarn = false) {
    this.validateKey(key, this.top, suppressWarn);
    this.top[key] = new oneWayNode<T>();

    return this;
  }

  addBottom (key: string, suppressWarn = false) {
    this.validateKey(key, this.bottom, suppressWarn);
    this.bottom[key] = new oneWayNode<T>();

    return this;
  }

  addElementTop (key: string, element: T) {
    if (this.validateElement(key, this.top)) {
      this.top[key].add(new twoWayNode<T>(element));
    }

    return this;
  }

  addElementBottom (key: string, element: T) {
    if (this.validateElement(key, this.bottom)) {
      this.bottom[key].add(new twoWayNode<T>(element));
    }

    return this;
  }

  add (options: addElementOptions<T>) {
    const {level, key, element} = options;
    if(!this.validateKey(key, this[level], true)) {
      switch (level) {
        case "top": this.addTop(key, true); break;
        case "bottom": this.addBottom(key, true); break;
      }
    }
    
    switch (level) {
      case "top": this.addElementTop(key, element); break;
      case "bottom": this.addElementBottom(key, element); break; 
    }

    return this; 
  }

  addAll (optionsArr: addElementOptions<T>[]) {
    optionsArr.forEach(option => this.add(option));

    return this;
  }

  getTop (key: string) {
    return this.top[key].to.map(node => node.element);
  }

  getBottom (key: string) {
    return this.bottom[key].to.map(node => node.element);
  }

  get (options: getElementOptions) {
    const {level, key} = options;

    switch (level) {
      case "top": return this.getTop(level);
      case "bottom": return this.getBottom(level);
    }
  }

  getAll (options: getElementOptions[]) {
    return options.map(option => this.get(option));
  }
}

