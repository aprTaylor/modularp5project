import p5 from "p5"
import PackageManager from "./core/packageManager";
import Package from "./core/package";
import Line from "./modules/Line";
import Mouse from "./modules/Mouse";
import LineToMouse from "./modules/LineToMouse";

let packageManager: PackageManager;

function sketch (p: p5) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.rectMode(p.CENTER);
        //colors = ColorHelper.getColorsArray(squares);
        packageManager = new PackageManager()
            .add(new Package([
                new Line(p, 10, 50, 100, 100), 
                new Mouse(p),
                new LineToMouse(p)
            ]))    
        //.add(new Package([new Shape(p, 'ellipse', 100, 100)], {x: 100, y: 200}))
    }

    p.draw = function draw() {

        p.background(255);
    
        packageManager.update();
        packageManager.draw();
    }    
}

new p5(sketch)
