/// <reference types="cypress" />
import { expect } from 'chai';
import Graph, { OneWayNode, TwoWayNode } from "../../../sketch/utils/structures/Graph"


const element = "one";

describe('oneWayNode', function() {
  describe('#add', function() {
    it('should add TwoWayNode to the to property', function() {
      const node = new OneWayNode();
      const twowaynode = new TwoWayNode(element);
      expect(node.add(twowaynode).to).deep.equal([twowaynode])
    });
  });

  describe('#remove', () => {
    it('should remove TwoWayNode from the to property', () => {
      const node = new OneWayNode();
      const twowaynode = new TwoWayNode(element);
      node.add(twowaynode);
      expect(node.remove(twowaynode).to).deep.equal([])
    })
    it('should maintain same to array if invalid node is given', () => {
      const node = new OneWayNode();
      const twowaynode = new TwoWayNode(element);
      const invalidnode = new TwoWayNode(null);
      node.add(twowaynode);
      expect(node.remove(invalidnode).to).deep.equal([twowaynode])
    })
    it('should maintain empty to array if node is removed when no nodes have been added', () => {
      const node = new OneWayNode();
      const twowaynode = new TwoWayNode(element);
      expect(node.remove(twowaynode).to).deep.equal([])
    })
  })
});

describe('twoWayNode', function() {
  describe('#add', function() {
    it('should add OneWayNode to top level', function() {
      const node = new TwoWayNode(element);
      const onewaynode = new OneWayNode<string>();
      expect(node.add('top', onewaynode).top).deep.equal([onewaynode])
    });
    it('should add OneWayNode to bottom level', function() {
      const node = new TwoWayNode(element);
      const onewaynode = new OneWayNode<string>();
      expect(node.add('bottom', onewaynode).bottom).deep.equal([onewaynode])
    });
  });

  describe('#remove', () => {
    it('should remove OneWayNode from top level', () => {
      const node = new TwoWayNode(element);
      const onewaynode = new OneWayNode<string>();
      node.add('top', onewaynode);
      expect(node.remove('top', onewaynode).top).deep.equal([]);
    })
    it('should remove OneWayNode from bottom level', () => {
      const node = new TwoWayNode(element);
      const onewaynode = new OneWayNode<string>();
      node.add('bottom', onewaynode);
      expect(node.remove('bottom', onewaynode).bottom).deep.equal([]);
    })
    it('should maintain empty top array if node is removed when no nodes have been added', () => {
      const node = new TwoWayNode(element);
      const onewaynode = new OneWayNode<string>();
      expect(node.remove('top', onewaynode).top).deep.equal([]);
    })
    it('should maintain empty bottom array if node is removed when no nodes have been added', () => {
      const node = new TwoWayNode(element);
      const onewaynode = new OneWayNode<string>();
      expect(node.remove('bottom', onewaynode).bottom).deep.equal([]);
    })
  })

  describe('#delete', () => {
    it('should null all properties', () => {
      const node = new TwoWayNode(element);
      node.delete();

      //All expect functions should be null
      const nullProps = Object.getOwnPropertyNames(node).map(key => node[key] === null || typeof node[key] === 'function');
      expect(nullProps).to.not.have.any.members([false]);
    })
  })
});

const key = "key";
const key2 = "key2";
describe('graph', () => {
  describe('#addTop', () => {
    it('should add key as OneWayNode to top object', () => {
      const graph = new Graph();
      const onewaynode = new OneWayNode();
      
      expect(graph.addTop(key).top).to.deep.equal({[key]: onewaynode})
    })
    it('should keep OneWayNode if key already exists in top object', () => {
      const graph = new Graph();
      
      const firstOneWayNode = graph.addTop(key).top[key];
      const secondOneWayNode = graph.addTop(key).top[key];
      
      expect(firstOneWayNode).to.equal(secondOneWayNode);
    })
  })
  describe('#addBottom', () => {
    it('should add key as OneWayNode to bottom object', () => {
      const graph = new Graph();
      const onewaynode = new OneWayNode();
      
      expect(graph.addBottom(key).bottom).to.deep.equal({[key]: onewaynode})
    })
    it('should keep OneWayNode if key already exists in bottom object', () => {
      const graph = new Graph();
      
      const firstOneWayNode = graph.addBottom(key).bottom[key];
      const secondOneWayNode = graph.addBottom(key).bottom[key];
      
      expect(firstOneWayNode).to.equal(secondOneWayNode);
    })
  })

  describe('#addElementTop', () => {
    it('should add element as TwoWayNode to key in top', () => {
      const graph = new Graph<string>();
      graph.addTop(key);

      const oneWayNode = graph.addElementTop(key, element).top[key];
      const twoWayNode = new TwoWayNode(element).add('top', oneWayNode);

      expect(oneWayNode.to).to.deep.equal([twoWayNode])
    })

  })

  describe('#addElementBottom', () => {
    it('should add element as TwoWayNode to key in top', () => {
      const graph = new Graph<string>();

      const oneWayNode = graph.addElementBottom(key, element).bottom[key];
      const twoWayNode = new TwoWayNode(element).add('bottom', oneWayNode);

      expect(oneWayNode.to).to.deep.equal([twoWayNode])
    })
  })

  describe('#getSiblings', () => {
    it('should return all sibling nodes', () => {
      const graph = new Graph<string>();
      const top1 = "top1";
      const top2 = "top2";
      const elements = ["one", "two", "three"]

      graph.addAll([
        {top: top1, element: elements[0]},
        {top: top2, element: elements[2]},
        {top: top1, element: elements[1]},
      ]);

      expect(graph.getSiblings(elements[0], "bottom"))
        .to
        .have
        .members(elements.slice(0, 2))
        .and
        .to
        .not
        .include(elements[2])
    })
  })

  describe('generally', () => {
    it('should not re-add an element already in the graph', () => {
      const graph = new Graph<string>();
      const oneWayNodeTop = graph.addElementTop(key, element).top[key];
      const oneWayNodeBottom = graph.addElementBottom(key2, element).bottom[key2];

      expect(oneWayNodeTop.to[0]).to.equal(oneWayNodeBottom.to[0]);
    })

    it('should iterate in insertion order', () => {
      const graph = new Graph<string>();
      const elements = ["one", "two", "three", "four"];

      graph.addAll(elements.map((element, index) => ({
        top: index%2==0 && element,
        bottom: index%2!=0 && element,
        element
      })))
      

      let i = 0;
      let matches = true;
      for(const element of graph) {
        if(element !== elements[i]) {
          matches = false;
          break;
        }
        i++;
      }

      expect(matches).to.be.true;
    })
  
  })
})

export {};

