exports.readFileSync = function(fn) {
    return Envjs.readFromFile('file://'+fn);
}
