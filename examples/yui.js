// detect nodejs
if (!process.versions.node) {
    // fixup paths
    //require.paths[0] = String(require.paths[0]).replace(/\/[^\/]+$/, '');
    require.paths.push('./envjs/platform/node');
    print('PTHS:' + require.paths);
}

// npm packages...
require.paths.push('/Users/standa/Sites/gdc/client/.npm_libs');

YUI = require('../yui/nodejs-yui3/lib/node-yui3').YUI;
YUI.loadSync = true;

require('../gdc/client/npm/gdc-core/gdc-core');

YUI({
    filter: 'debug'
}).use('node', 'base', 'json', 'widget', 'gdc-core', 'GDC-util', function(Y) {
    var b = new Y.Base();
    b.addAttr('attr', {});

    //Y.log('Base: ' + Y.JSON.stringify(b.getAttrs()));

    YW = function() {
        YW.superclass.constructor.call(this);
    }
    YW.NAME = 'YW';
    Y.extend(YW, Y.Widget);

    var w = new YW();
    w.render();
    Y.log('Body: ' + Y.one(document.body).get('outerHTML'));
    Y.log('Base: ' + Y.JSON.stringify(process.versions));
});
