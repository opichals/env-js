// This file is compiled into the jar and executed automatically on startup.
var __this__ = this;
var require = (function() {
    var cached = {};
    var currentPath = java.lang.System.getProperty('user.dir');
    var paths = [currentPath];
    process = {
        versions: {
        },
        binding: function() {
            return {};
        }
    };
    process.require = require;
    process.compile = vm_runInThisContext;
    
    function normalize(id) {
		var file;
        if (/^\//.test(id)) {
            // no path manipulations necessary
            file = new java.io.File(id);
            if (file.isDirectory()) {
                // nodejs-like require
                file = new java.io.File(file.toString() + '/index.js');
            } else {
                if (!file.isFile()) {
                    file = new java.io.File(file.toString() + '.js');
                }
            }
		print('require A:'+ file.toString() +' : ' + (file.isFile()?'OK':'FAIL'));
            if (file.isFile()) {
                return file;
            }
        } else if (/^\.\.?/.test(id)) {
            // relative path (from top-level require() calls)
            id = id.replace(/^\.\//, '');
            file = new java.io.File(currentPath+'/..', id);
            if (file.isDirectory()) {
                // nodejs-like require
                file = new java.io.File(file.toString() + '/index.js');
            } else {
                if (!file.isFile()) {
                    file = new java.io.File(file.toString() + '.js');
                }
            }
		print('require R:'+ file.toString() +' : ' + (file.isFile()?'OK':'FAIL'));
            if (file.isFile()) {
                return file;
            }
        } else {
            // find in the module path list
            for (var i = 0, len = paths.length; i < len; ++i) {
                file = new java.io.File(paths[i], id);
                if (file.isDirectory()) {
                    // nodejs-like require
                    file = new java.io.File(file.toString() + '/index.js');
                } else {
                    if (!file.isFile()) {
                        file = new java.io.File(file.toString() + '.js');
                    }
                }
		print('require P:'+ file.toString() +' : ' + (file.isFile()?'OK':'FAIL'));
                if (file.isFile()) {
                    return file;
                }
            }
            // try to get it from the jar as a last resort
            /*var url = rhoop.getClass().getResource('/' + id);
            if (url !== null) {
                return url;
            }*/
        }
        return undefined;
    };
    
    function read(connection) {
        var stream = connection.getInputStream();
        var bytes = java.lang.reflect.Array.newInstance(
                java.lang.Byte.TYPE, 4096);
        var bytesStream = new java.io.ByteArrayOutputStream();
        var bytesRead;
        while ((bytesRead = stream.read(bytes)) >= 0) {
            if (bytesRead > 0) {
                bytesStream.write(bytes, 0, bytesRead);
            }
        }
        return String(bytesStream.toString());
    };
    
    function vm_runInThisContext(source, filename) {
        var ctx = org.mozilla.javascript.Context.getCurrentContext();
        return ctx.evaluateString({}, source, filename, 1, null);
    }

    function require(id) {
        var file = normalize(id);
        if (!file) {
            throw new Error("couldn't find module \"" + id + "\"");
        }
        id = String(file.toString());
        if (!cached.hasOwnProperty(id)) {
            // needs to be outside the top-level require
            if (typeof Envjs !== 'undefined' && Envjs.platform) {
                process.versions[Envjs.platform] = Envjs.revision;
            }

            var source = read(file.toURL().openConnection());
            source = source.replace(/^\#\!.*/, '');
            source = (
                "(function (require, exports, module, process) {" +
                "   var __filename = module.__filename;"+
                "   var __dirname = module.__dirname;"+
                "   var require = function(mid) {" +
                "       if (mid.indexOf('.') === 0) {" +
                "           mid = mid.replace(/^\.\\\//, '');" +
                "           mid = __dirname + mid; }" +
                "       return process.require(mid);" +
                "   }; require.paths = process.require.paths; " +
                source + "\n});" );
            var m;
            cached[id] = m = {
                module: {
                    exports: {},
                    id: id,
                    uri: id,
                    __filename: file.toString(),
                    __dirname: file.getParent().toString() + '/'
                }
            };
            var previousPath = currentPath;
            try {
                currentPath = id.substr(0, id.lastIndexOf('/')) || '.';
                var func = vm_runInThisContext(source, id);
                func(require, m.module.exports, m.module, process);
            } finally {
                currentPath = previousPath;
            }
        }
		/*
		print('returning exports for id: '+id+' '+cached[id].exports);
		for(var prop in cached[id].module.exports){
			print('export: '+prop);
		}
		*/
        return cached[id].module.exports;
    };
    require.paths = paths;
    
    return require;
}());
var __argv__ = arguments;
require('envjs/platform/rhino');
require('envjs/window');
