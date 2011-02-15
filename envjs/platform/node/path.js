exports.join = function() {
    return [].slice.call(arguments).join('/');
};
exports.existsSync = function(f) {
    var file = new java.io.File(f);
    return file.exists();
}
exports.dirname = function(f) {
    var file = new java.io.File(f);
    if (file.isDirectory())
        return file.toString();
    return file.getParent().toString();
}
