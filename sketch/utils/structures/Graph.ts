import { without } from 'ramda'

export class OneWayNode<T> {
  to: TwoWayNode<T>[];

  constructor () {
    this.to = [];
  } 

  add (node: TwoWayNode<T>) {
    this.to.push(node);
    return this;
  }

  remove (node: TwoWayNode<T>) {
   this.to = without([node], this.to);
   return this;
  }
}

type Level = "top" | "bottom"
export class TwoWayNode<T> {
  element: T
  top: OneWayNode<T>[]
  bottom: OneWayNode<T>[]

  constructor (item: T) {
    this.element = item;
    this.top = [];
    this.bottom = [];
  }

  add(end: Level, node: OneWayNode<T>) {
    switch(end){
      case "top": this.top.push(node); break;
      case "bottom": this.bottom.push(node); break;
    }

    return this;
  }

  remove(end: Level, node: OneWayNode<T>) {
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
  top: Record<string, OneWayNode<T>>
  bottom: Record<string, OneWayNode<T>>

  constructor () {
    this.top = {};
    this.bottom = {};
  }

  private validateKey (key: string, obj: Record<string, OneWayNode<T>>, suppressWarn = false) {
    if (obj[key]) {
      !suppressWarn && console.warn(key, "is already present in graph.");
      return false;
    }

    return true;
  }

  private validateElement (key: string, obj: Record<string, OneWayNode<T>>, suppressWarn = false) {
    if (!obj[key]) {
      !suppressWarn && console.warn(key, "is not present in graph. Cannot add to graph.");
      return false;
    }

    return true;
  }


  addTop (key: string, suppressWarn = false) {
    if(this.validateKey(key, this.top, suppressWarn)) {
      this.top[key] = new OneWayNode<T>();
    }
    
    return this;
  }

  addBottom (key: string, suppressWarn = false) {
    if(this.validateKey(key, this.bottom, suppressWarn)) {
      this.bottom[key] = new OneWayNode<T>();
    }

    return this;
  }

  // unbiased adding to graph
  private addElementToGraph (level: Level, key: string, element: T) {
    if(this.validateElement(key, this[level])) {
      const node = new TwoWayNode<T>(element);
      //Add node to given record
      this[level][key].add(node);

      //wire node to level
      node.add(level, this[level][key]);
    }
  }

  addElementTop (key: string, element: T) {
    this.addElementToGraph('top', key, element);

    return this;
  }

  addElementBottom (key: string, element: T) {
    this.addElementToGraph('bottom', key, element);

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

