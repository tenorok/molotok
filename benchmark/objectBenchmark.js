definer('objectBenchmark', function(format, object) {
    var Benchmark = require('benchmark'),
        benchmarks = require('beautify-benchmark');

    describe('Тестирование производительности модуля object.', function() {
        var ops = {};
        this.timeout(15000);

        ops.extend = 1250000;
        it('Расширение объекта / ' + format(ops.extend), function(done) {
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

        ops.deepExtend = 54000;
        it('Рекурсивное расширение объекта / ' + format(ops.deepExtend), function(done) {
            new Benchmark.Suite()
                .add('deepExtend', function() {
                    object.deepExtend({ a: 1, b: { c: 2 }}, { c: 3, b: { d: 4 }}, { b: { c: 5 }});
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.deepExtend
                        ? done(new Error('Slower than ' + format(ops.deepExtend)))
                        : done();
                })
                .run({ async: true });
        });

        ops.isEmpty = 6000000;
        it('Проверка объекта на наличие полей / ' + format(ops.isEmpty), function(done) {
            new Benchmark.Suite()
                .add('isEmpty', function() {
                    object.isEmpty({});
                    object.isEmpty({ a: 1 });
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.isEmpty
                        ? done(new Error('Slower than ' + format(ops.isEmpty)))
                        : done();
                })
                .run({ async: true });
        });

    });
});
