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

        ops.each = 3700000;
        it('Проитерироваться по ключам объекта / ' + format(ops.each), function(done) {
            new Benchmark.Suite()
                .add('each', function() {
                    object.each({ a: 1, b: true, c: null, d: { d1: 25 }, e: 'hello' }, function() {});
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.each
                        ? done(new Error('Slower than ' + format(ops.each)))
                        : done();
                })
                .run({ async: true });
        });

        ops.deepEach = 90000;
        it('Рекурсивно проитерироваться по ключам объекта / ' + format(ops.deepEach), function(done) {
            new Benchmark.Suite()
                .add('deepEach', function() {
                    object.deepEach({
                        a: 100,
                        b: 'first',
                        c: {
                            c1: 200,
                            c2: false,
                            c3: {
                                c31: 20,
                                c32: true
                            },
                            c4: null
                        },
                        d: 300,
                        e: 'second'
                    }, function() {});
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.deepEach
                        ? done(new Error('Slower than ' + format(ops.deepEach)))
                        : done();
                })
                .run({ async: true });
        });

    });
});
