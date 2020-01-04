import p5 from "p5"
import PackageManager from "./core/packageManager";
import Package from "./core/package";
import Shape from "./modules/Shape"

let packageManager: PackageManager;

function sketch (p: p5) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.rectMode(p.CENTER);
        //colors = ColorHelper.getColorsArray(squares);
        packageManager = new PackageManager()
            .add(new Package("dot", [new Shape(p, 'ellipse', 100, 100)], {x: 100, y: 200}))
    }

    p.draw = function draw() {

        p.background(51);
    
        packageManager.update()
    }    
}

new p5(sketch)
