definer('objectBenchmark', function(format, object) {
    var Benchmark = require('benchmark'),
        benchmarks = require('beautify-benchmark');

    describe('Тестирование производительности модуля object.', function() {
        var ops = {};
        this.timeout(15000);

        ops.extend = 900000;
        it('Проверка расширения объекта / ' + format(ops.extend), function(done) {
            new Benchmark.Suite()
                .add('extend', function() {
                    object.extend({ a: 1 }, { b: 2, c: 3 });
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.extend
                        ? done(new Error('Slower than ' + format(ops.extend)))
                        : done();
                })
                .run({ async: true });
        });

    });
});
