var system = require('systemjs');
system.import('compiled/index').then(function(index) {
    index.main();
});