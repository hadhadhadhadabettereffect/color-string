var test = require("tape");
var ColorString = require("./dist/colorstring-module.js");


test("\n instance creation", function(t) {
    t.comment(groupTitle("obj.id"));

    t.test("instance.id is an int", function(tt) {    
        tt.plan(2);
        var c = new ColorString();
        var id = c.id;
        tt.equal(typeof id, "number");
        tt.equal(id, Math.floor(id));
    });

    t.test("ids should increment by 1", function(tt) {
        tt.plan(2);
        var c1 = new ColorString();
        var c2 = new ColorString();
        var c3 = new ColorString();
        tt.equal(c1.id + 1, c2.id);
        tt.equal(c2.id + 1, c3.id);
    });

    t.test("'id' property is not editable", function(tt) {
        tt.plan(1);
        var c = new ColorString();
        var id = c.id;
        c.id = id + 1;
        tt.equal(id, c.id);
    });
});


test("\n red, green, and blue properties", function(t) {
    t.comment(groupTitle("obj.red, obj.green, obj.blue"));

    t.test("red, green, blue properties are ints", function(tt) {
        tt.plan(3);
        function isUint8(n) {
            return (typeof n === "number" && n >= 0 && n <= 255 && n === (n | 0));
        }
        var c = new ColorString();
        tt.ok(isUint8(c.red));
        tt.ok(isUint8(c.green));
        tt.ok(isUint8(c.blue));
    });

    t.test("red, green, blue properties can be assigned int values", function(tt) {
        tt.plan(9);
        var c = new ColorString();   
        var r1 = 1;
        var g1 = 2;
        var b1 = 3;

        c.red = r1;
        c.green = g1;
        c.blue = b1;
        
        tt.equal(c.red, r1);
        tt.equal(c.green, g1);
        tt.equal(c.blue, b1);
        
        c.red = 4;
        c.green = 5;
        c.blue = 6;
        
        var r2 = c.red;
        var g2 = c.green;    
        var b2 = c.blue;

        tt.equal(c.red, r2);
        tt.equal(c.green, g2);
        tt.equal(c.blue, b2);

        tt.notEqual(r1, r2);
        tt.notEqual(g1, g2);
        tt.notEqual(b1, b2);
    });

    t.test("red, green, blue properties can be assigned parsable string values", function(tt) {
        tt.plan(6);
        var c = new ColorString();
        tt.equal(c.red, 255, "confirm default value");
        tt.equal(c.green, 255, "confirm default value");
        tt.equal(c.blue, 255, "confirm default value");
       
        c.red = "1";
        c.green ="2";
        c.blue = "3";
        
        tt.equal(c.red, 1);
        tt.equal(c.green, 2);
        tt.equal(c.blue, 3);
    });

    t.test("red, green, blue properties cannot be set to null", function(tt) {
        tt.plan(3);
        var c = new ColorString();
        var r1 = c.red = 1;
        var g1 = c.green = 2;
        var b1 = c.blue = 3;
       
        c.red = null;
        c.green = null;
        c.blue = null;
        
        tt.equal(r1, c.red);
        tt.equal(g1, c.green);
        tt.equal(b1, c.blue);
    });

    t.test("float values for red, green, blue will be floored", function(tt) {
        tt.plan(6);
        var c = new ColorString();
        tt.equal(c.red, 255, "confirm default value");
        tt.equal(c.green, 255, "confirm default value");
        tt.equal(c.blue, 255, "confirm default value");
        
        c.red = 4.5;
        c.green /= 2; // 127.5
        c.blue *= 0.33; // 84.15 
        
        tt.equal(c.red, 4);
        tt.equal(c.green, 127);
        tt.equal(c.blue, 84);
    });

    t.test("red, green, blue properties can be incremented", function(tt) {
        tt.plan(6);
        var c = new ColorString();
        
        var r1 = c.red = 1;
        var g1 = c.green = 2;
        var b1 = c.blue = 3;
       
        var r2 = ++c.red;
        var g2 = c.green += 5;
        var b2 = c.blue *= 2;
        
        tt.equal(r2, c.red);
        tt.equal(g2, c.green);
        tt.equal(b2, c.blue);

        tt.notEqual(r1, r2);
        tt.notEqual(g1, g2);
        tt.notEqual(b1, b2);
    });

    t.test("red, green, blue properties cap at min 0", function(tt) {
        tt.plan(6);
        var c = new ColorString();
        
        c.red = 1;
        c.green = 2;
        c.blue = 3;
        
        tt.equal(c.red, 1);
        tt.equal(c.green, 2);
        tt.equal(c.blue, 3);
        
        c.red -= 300;
        c.green = -1;
        c.blue = ~(c.blue);
        
        tt.equal(c.red, 0);
        tt.equal(c.green, 0);
        tt.equal(c.blue, 0);
    });

    t.test("red, green, blue properties cap at max 255", function(tt) {
        tt.plan(6);
        var c = new ColorString();
        
        c.red = 1;
        c.green = 2;
        c.blue = 3;
        
        tt.equal(c.red, 1);
        tt.equal(c.green, 2);
        tt.equal(c.blue, 3);
        
        c.red <<= 9;
        c.green += 400;
        c.blue *= 100;
        
        tt.equal(c.red, 255);
        tt.equal(c.green, 255);
        tt.equal(c.blue, 255);
    });

    t.test("default red, green, blue values are 255,255,255", function(tt) {
        tt.plan(3);
        var c = new ColorString();

        tt.equal(c.red, 255);
        tt.equal(c.green, 255);
        tt.equal(c.blue, 255);
    });
});


test("\n hex property", function(t) {
    t.comment(groupTitle("obj.hex"));

    t.test("default value of hex property is '#ffffff'", function(tt) {
        tt.plan(1);
        var c = new ColorString();
        tt.equal(c.hex, "#ffffff");
    });

    t.test("hex property can be set with a string", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.hex, "#ffffff", "confirm default value");
        c.hex = "#cccccc";
        tt.equal(c.hex, "#cccccc");
    });

    t.test("leading hash can be omitted from assigned hex string", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.hex, "#ffffff", "confirm default value");
        c.hex = "CCCCCC";
        tt.equal(c.hex, "#cccccc");
    });

    t.test("hex can be set with 3 or 6 digit hex codes", function(tt) {
        tt.plan(3);
        var c = new ColorString();
        tt.equal(c.hex, "#ffffff", "confirm default value");
        c.hex = "#ccc";
        tt.equal(c.hex, "#cccccc");
        c.hex = "000";
        tt.equal(c.hex, "#000000");
    });

    t.test("updating red,green,blue properties updates hex string", function(tt) {
        tt.plan(4);
        var c = new ColorString();
        tt.equal(c.hex, "#ffffff", "confirm default value");
        c.red = 200;
        tt.equal(c.hex, "#c8ffff");
        c.green -= 100;
        tt.equal(c.hex, "#c89bff");
        c.blue -= 1000;
        tt.equal(c.hex, "#c89b00");
    });

    t.test("updating hex string updates red,green,blue properties", function(tt) {
        tt.plan(9);

        var c = new ColorString();
        tt.equal(c.red, 255, "confirm default value");
        tt.equal(c.green, 255, "confirm default value");
        tt.equal(c.blue, 255, "confirm default value");

        c.hex = "ccc";
        tt.equal(c.red, 204);
        tt.equal(c.green, 204);
        tt.equal(c.blue, 204);

        c.hex = "#80BFCE";
        tt.equal(c.red, 128);
        tt.equal(c.green, 191);
        tt.equal(c.blue, 206);
    });
});


test("\n rgba property", function(t) {
    t.comment(groupTitle("obj.rgba"));
    
    t.test("default value of rgba property is 'rgba(255,255,255,1.0)'", function(tt) {
        tt.plan(1);
        var c = new ColorString();
        tt.equal(c.rgba, "rgba(255,255,255,1.0)");
    });


    t.test("rgba property can be set with a string", function(tt) {
        tt.plan(3);
        var c = new ColorString();
        tt.equal(c.rgba, "rgba(255,255,255,1.0)", "confirm default value");
        c.rgba = "rgba(0,1,2,0.2)";
        tt.equal(c.rgba, "rgba(0,1,2,0.20)", "rgba string with alpha value");
        c.rgba = "rgb(10, 10, 10)";
        tt.equal(c.rgba, "rgba(10,10,10,0.20)", "rgb set without alpha value");

    });

    t.test("updating red,green,blue properties updates rgba string", function(tt) {
        tt.plan(4);
        var c = new ColorString();
        tt.equal(c.rgba, "rgba(255,255,255,1.0)", "confirm default value");
        c.red = 10;
        tt.equal(c.rgba, "rgba(10,255,255,1.0)");
        c.green -= 100;
        tt.equal(c.rgba, "rgba(10,155,255,1.0)");
        c.blue -= 300;
        tt.equal(c.rgba, "rgba(10,155,0,1.0)");
    });

    t.test("updating rgba string updates red,green,blue properties", function(tt) {
        tt.plan(6);
        var c = new ColorString();
        tt.equal(c.red, 255, "confirm default value");
        tt.equal(c.green, 255, "confirm default value");
        tt.equal(c.blue, 255, "confirm default value");

        c.rgba = "rgba(9 ,33, 180, 0.2)";

        tt.equal(c.red, 9);
        tt.equal(c.green, 33);
        tt.equal(c.blue, 180);
    });

    t.test("updating hex string updates rgba string", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.rgba, "rgba(255,255,255,1.0)", "confirm default value");
        c.hex = "aaa";
        tt.equal(c.rgba, "rgba(170,170,170,1.0)");
    });

    t.test("updating rgba updates hex", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.hex, "#ffffff", "confirm default value");
        c.rgba = "rgba(170,170,170,1.0)";
        tt.equal(c.hex, "#aaaaaa");
    });
});


test("\n alpha property", function(t) {
    t.comment(groupTitle("obj.alpha"));

    t.test("default alpha value is 1.0", function(tt) {
        tt.plan(1);
        var c = new ColorString();
        tt.equal(c.alpha, 1.0);
    });

    t.test("alpha can be set with a number", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.alpha, 1.0, "confirm default value");
        c.alpha = 0.5;
        tt.equal(c.alpha, 0.5);
    });

    t.test("alpha can be set with a parsable string", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.alpha, 1.0, "confirm default value");
        c.alpha = "0.5";
        tt.equal(c.alpha, 0.5);
    });

    t.test("alpha cannot be set with null", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.alpha, 1.0, "confirm default value");
        c.alpha = null;
        tt.equal(c.alpha, 1.0, "value unchanged");
    });

    t.test("updating alpha updates rgba", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.rgba, "rgba(255,255,255,1.0)", "confirm default value");
        c.alpha = 0.5
        tt.equal(c.rgba, "rgba(255,255,255,0.50)");
    });

    t.test("alpha can be updated through rgba string", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.alpha, 1.0, "confirm default value");
        c.rgba = "(200,200,200,0.5)";
        tt.equal(c.alpha, 0.5);
    });

    t.test("min alpha value is 0", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.alpha, 1.0, "confirm default value");
        c.alpha -= 2;
        tt.equal(c.alpha, 0);
    });

    t.test("max alpha value is 1", function(tt) {
        tt.plan(2);
        var c = new ColorString();
        tt.equal(c.alpha, 1.0, "confirm default value");
        c.alpha = 15.2;
        tt.equal(c.alpha, 1.0);
    });
});


// not test related. just for output readability
var groupBreak = "\n###########################\n";
function groupTitle(str) {
    return groupBreak + str + groupBreak;
}