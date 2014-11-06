function Target() {}

Target.definer = function() {

    var modules = [
            'is',
            'string',
            'number',
            'array',
            'object',
            'functions'
        ],

        benchmarkModules = [
            'is',
            'object'
        ],

        directories = ['modules/', 'test/'],
        directoriesBenchmark = ['modules/', 'test/helpers/', 'benchmark/'],
        verbose = ['info', 'error'],

        target = {
            release: {
                target: 'release/molotok.js',
                directory: 'modules/',
                verbose: verbose,
                jsdoc: {
                    file: 'Helpers for enjoying the development.',
                    copyright: '2014 Artem Kurbatov, tenorok.ru',
                    license: 'MIT license',
                    version: 'package.json',
                    date: true
                }
            },
            main: {
                target: 'test/tmp/mainTest.js',
                directory: directories,
                verbose: verbose
            },
            mainBenchmark: {
                target: 'test/tmp/mainBenchmark.js',
                directory: directoriesBenchmark,
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

    benchmarkModules.forEach(function(moduleName) {
        var benchmarkName = moduleName + 'Benchmark';
        target[benchmarkName] = {
            module: benchmarkName,
            target: 'test/tmp/' + benchmarkName + '.js',
            directory: directoriesBenchmark,
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
