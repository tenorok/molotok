definer('objectBenchmark', function(format, object) {
    var Benchmark = require('benchmark'),
        benchmarks = require('beautify-benchmark');

    describe('Тестирование производительности модуля object.', function() {
        var ops = {};
        this.timeout(30000);

        ops.extend = 8000000;
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

        ops.deepExtend = 50000;
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

        ops.isEqual = 350000;
        it('Проверить объекты на идентичность / ' + format(ops.isEqual), function(done) {
            new Benchmark.Suite()
                .add('isEqual', function() {
                    object.isEqual({ a: 'a', b: true, c: false }, { a: 'a', b: true });
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();
                    result.target.hz < ops.isEqual
                        ? done(new Error('Slower than ' + format(ops.isEqual)))
                        : done();
                })
                .run({ async: true });
        });

        ops.isEqualWithLink = 350000;
        it('Проверить объекты-ссылки на идентичность / ' + format(ops.isEqualWithLink), function(done) {
            var obj = { a: 1, b: 2 };
            new Benchmark.Suite()
                .add('isEqualWithLink', function() {
                    object.isEqual(obj, obj);
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();
                    result.target.hz < ops.isEqualWithLink
                        ? done(new Error('Slower than ' + format(ops.isEqualWithLink)))
                        : done();
                })
                .run({ async: true });
        });

        ops.isDeepEqual = 15000;
        it('Проверить объекты на идентичность рекурсивно / ' + format(ops.isDeepEqual), function(done) {
            new Benchmark.Suite()
                .add('isDeepEqual', function() {
                    object.isDeepEqual(
                        { a: 1, b: { c: 2, d: { e: [1, { x: 0 }, 'foo'] }, f: [{}], g: 5 }},
                        { a: 1, b: { c: 2, d: { e: [1, { x: 0 }, 'bar'] }, f: [{}], g: 5 }}
                    );
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();
                    result.target.hz < ops.isDeepEqual
                        ? done(new Error('Slower than ' + format(ops.isDeepEqual)))
                        : done();
                })
                .run({ async: true });
        });

        ops.isDeepEqualWithLink = 20000;
        it('Проверить объекты с ссылкой на идентичность рекурсивно / ' + format(ops.isDeepEqualWithLink),
            function(done) {
            var d = { e: [1, { x: 0 }, 'foo'] };
            new Benchmark.Suite()
                .add('isDeepEqualWithLink', function() {
                    object.isDeepEqual(
                        { a: 1, b: { c: 2, d: d, f: [{}], g: 5 }},
                        { a: 1, b: { c: 2, d: d, f: [{}], g: 5 }}
                    );
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();
                    result.target.hz < ops.isDeepEqualWithLink
                        ? done(new Error('Slower than ' + format(ops.isDeepEqualWithLink)))
                        : done();
                })
                .run({ async: true });
        });

        ops.size = 4000000;
        it('Получить количество собственных полей объекта / ' + format(ops.size), function(done) {
            var obj = {
                a: 1, b: 2, c: 3,
                d: 4, e: 5, f: 6
            };
            new Benchmark.Suite()
                .add('Object.keys', function() {
                    Object.keys(obj).length;
                })
                .add('size', function() {
                    object.size(obj);
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();
                    result.target.hz < ops.size
                        ? done(new Error('Slower than ' + format(ops.size)))
                        : done();
                })
                .run({ async: true });
        });

        ops.each = 3500000;
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

        ops.deepEach = 70000;
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
