import assert from "assert";
import { oneWayNode, twoWayNode } from "../sketch/utils/structures/Graph"


const element = "one";

describe('oneWayNode', function() {
  describe('#add', function() {
    it('should add twoWayNode to the to property', function() {
      
      const node = new oneWayNode();
      const twowaynode = new twoWayNode(element);
      assert.equal(node.add(twowaynode).to, [element]);
    });
  });
});

export {};

