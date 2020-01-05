import p5 from "p5"
import PackageManager from "./core/packageManager";
import Package from "./core/package";
import Shape from "./modules/Shape"
import Line from "./modules/Line";
import Mouse from "./modules/Mouse";

let packageManager: PackageManager;

function sketch (p: p5) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.rectMode(p.CENTER);
        //colors = ColorHelper.getColorsArray(squares);
        packageManager = new PackageManager()
            .add(new Package([new Line(p, 0, 0, 100, 100), new Mouse(p)]))    
        //.add(new Package([new Shape(p, 'ellipse', 100, 100)], {x: 100, y: 200}))
    }

    p.draw = function draw() {

        p.background(51);
    
        packageManager.update()
    }    
}

new p5(sketch)
