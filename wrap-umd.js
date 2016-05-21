var fs = require("fs");
var path = require("path");

var distPath = path.resolve(__dirname, "dist");
var filePath = path.resolve(distPath, "colorstring-module.js");

var umdPre = "(function (root, factory) {\n\
    if (typeof define === 'function' && define.amd) {\n\
        define([], factory);\n\
    } else if (typeof module === 'object' && module.exports) {\n\
        module.exports = factory();\n\
    } else {\n\
        root.returnExports = factory();  }\n\
}(this, function () {\n";
var umdPost = "\nreturn ColorString;\n}));";

fs.readFile("./dist/colorstring.js", function(err, data) {
    if (err) throw err;
    fs.access(distPath, fs.R_OK | fs.W_OK, function(err) {
        if (err) throw err;
        fs.stat(filePath, function(err) {
            if (err && err.code !== "ENOENT") throw(err);
            fs.writeFile(filePath, umdPre + data + umdPost, function(err) {
                if (err) throw err;
            }); 
        });
    });
});