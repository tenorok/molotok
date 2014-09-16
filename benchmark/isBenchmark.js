definer('isBenchmark', function(assert, is) {
    var Benchmark = require('benchmark'),
        benchmarks = require('beautify-benchmark');

    describe('Тестирование производительности модуля is.', function() {
        this.timeout(15000);

        it('Проверка на карту', function(done) {
            new Benchmark.Suite()
                .add('map', function() {
                    is.map({}, {}, {});
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < 50000
                        ? done(new Error('Slower than 50,000 ops/sec'))
                        : done();
                })
                .run({ async: true });
        });

        it('Проверка на массив', function(done) {
            new Benchmark.Suite()
                .add('array', function() {
                    is.array(true, false, []);
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < 750000
                        ? done(new Error('Slower than 750,000 ops/sec'))
                        : done();
                })
                .run({ async: true });
        });

    });
});
