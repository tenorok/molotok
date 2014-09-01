module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var Target = require('./grunt/Target'),
        module = grunt.option('module') || 'main';

    grunt.initConfig({
        mkdir: {
            release: {
                options: { create: ['release'] }
            }
        },
        uglify: {
            release: {
                options: {
                    preserveComments: 'some'
                },
                files: { 'release/molotok.min.js': 'release/molotok.js' }
            }
        },
        clean: {
            test: ['!test/tmp/.gitkeep', 'test/tmp/*'],
            jsdoc: ['jsdoc'],
            release: ['release']
        },
        shell: {
            jsdoc: { command: './node_modules/.bin/jsdoc -d jsdoc modules/' }
        },
        definer: Target.definer(),
        mochaTest: Target.mocha(module)
    });

    grunt.registerTask('jsdoc', ['shell:jsdoc']);

    grunt.registerTask('test', [
        'clean:test',
        'definer:' + module,
        'mochaTest'
    ]);

};
