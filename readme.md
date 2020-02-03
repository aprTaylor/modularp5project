# Modular p5

Create P5 projects in a modular way

[Live Here](https://agray5.github.io/modularp5project/)

Credit to the [_Nature of Code_](https://natureofcode.com) as a reference for demoing. 

## Usage
Add entities as a collection of components
```js
packageManager = new PackageManager({sketch: p})
            .add([
            {name: 'location', x: 0, y: 0},
            {name: 'color', color: 'blue'}
            ])

```

### Run systems
Pass array of systems to PackageManger.update
```js
const Draw = (pm: PackageManager) => {
  pm.getByMod('draw').forEach(mod => {
    const { line } = pm.get(mod);
    if (line instanceof Line) {
      pm.sketch.line(line.x1, line.y1, line.x2, line.y2);
    }
  });
}
packageManager.update([Draw]);
```
## System
A system is a function meant to be called every update cycle. 
It is supplied with a reference to PackageManger so that it can get components, and perform other operations.

## Entity 
An entity is just an id that groups components together.
Currently this is automatically generated.

## Component 
A component must at least have a name to refrence it by. 
Any other data or methods are optional. 
