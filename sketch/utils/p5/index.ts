import p5 from "p5";

export default function mouseVector(sketch: p5) {
  return sketch.createVector(sketch.mouseX, sketch.mouseY);
}