## Usage
* create an instance with new e.g. `var myColor = new ColorString()`
* update properties with their appropriate types (see "Object Properties")
* values are kept in sync; e.g. changing myColor.red will update the value of myColor.hex and vice versa.

## Object Properties
```
{
    red: int, // 0-255
    green: int, // 0-255
    blue: int, // 0-255
    alpha: float, // 0-1
    hex: string, // default "#ffffff"
    rgba: string // default "rgba(255,255,255,1.0)"
}
```

## Updating values
"red", "green", "blue" properties can be set with ints between 0 and 255
```
var myColor = new ColorString();
// myColor.hex == "#ffffff"

myColor.red = 50;
myColor.green = myColor.red + 200;
myColor.blue -= 30;

// myColor.hex == "#32fae1"
```

"hex" and "rgba" can be set with strings
```
myColor.red = 0;

myColor.hex = "#fff";
// myColor.red == 255

myColor.rgba = "rgb(120,40,30)";
// myColor.red == 120
```

"alpha" can be set with a float or in an rgba string
```
myColor.alpha = 0.7;
// myColor.rgba == "rgba(120,40,30,0.7)"

myColor.rgba = "rgba(255,255,255,0.2)";
// myColor.alpha == 0.2
```

### dev
* install dependencies with `npm install`
* update file[s] in the src/ directory
* add tests to ./tests.js
* testing's being done with tape <https://github.com/substack/tape>
* `npm run build` to update files in dist/
* `npm test` to run tests