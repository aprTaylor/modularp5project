//TODO: REMOVE
import p5 from "p5"
import PackageManager from "./core/packageManager";
import Systems from "./systems"
import Mover from "./creators/mover";

let packageManager: PackageManager;

function sketch (p: p5) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.rectMode(p.CENTER);
        //colors = ColorHelper.getColorsArray(squares);
        packageManager = new PackageManager({sketch: p})
            .add(Mover(p))
            .add(Mover(p))
    }

    p.draw = function () {

        p.background(255);
    
        packageManager.update(Systems);
    }
    

/*
    p.mousePressed = function () {
        packageManager.mousePressed();
    }*/
}

new p5(sketch);
