function Target() {}

Target.definer = function() {

    var modules = [
            'is',
            'string',
            'number',
            'object',
            'functions'
        ],

        directories = ['modules/', 'test/'],
        verbose = ['info', 'error'],

        target = {
            main: {
                target: 'test/tmp/main.js',
                directory: directories,
                verbose: verbose
            }
        };

    modules.forEach(function(moduleName) {
        var testName = moduleName + 'Test';
        target[moduleName] = {
            module: testName,
            target: 'test/tmp/' + testName + '.js',
            directory: directories,
            verbose: verbose
        };
    });

    return target;
};

Target.mocha = function(module) {

    var target = { main: { src: ['test/tmp/*'] }};

    if(module !== 'main') {
        target.options = { reporter: 'spec' };
    }

    return target;
};

module.exports = Target;
