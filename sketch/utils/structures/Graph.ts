import { without } from 'ramda'

export class oneWayNode<T, C> {
  element: T
  to: twoWayNode<C, any, any>[];

  add (node: twoWayNode<C, any, any>) {
    this.to.push(node);
    return this;
  }

  remove (node: twoWayNode<C, any, any>) {
   this.to = without([node], this.to);
   return this;
  }
}

type Level = "top" | "bottom"
export class twoWayNode<T, C1, C2> {
  element: T
  top: oneWayNode<C1 | C2, T>[]
  bottom: oneWayNode<C2 | C1, T>[]

  constructor (item: T) {
    this.element = item;
  }

  add<K extends Level>(end: K, node: oneWayNode<K extends "top"?C2:C1, T>) {
    switch(end){
      case "top": this.top.push(node); break;
      case "bottom": this.bottom.push(node); break;
    }

    return this;
  }

  remove<K extends Level>(end: K, node: oneWayNode<K extends "top"?C2:C1, T>) {
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

/**
 * A double entry graph. Two maps are specified, a top and a bottom.
 * Each element in both maps are Nodes.
 * 
 * This provides us a quick way to access objects from different contexts.
 */
export default class Graph {
  this.top 
}