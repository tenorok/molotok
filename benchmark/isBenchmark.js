definer('isBenchmark', function(format, is) {
    var Benchmark = require('benchmark'),
        benchmarks = require('beautify-benchmark');

    describe('Тестирование производительности модуля is.', function() {
        var ops = {};
        this.timeout(15000);

        ops.map = 130000;
        it('Проверка на карту / ' + format(ops.map), function(done) {
            new Benchmark.Suite()
                .add('map', function() {
                    is.map({}, {}, {});
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.map
                        ? done(new Error('Slower than ' + format(ops.map)))
                        : done();
                })
                .run({ async: true });
        });

        ops.array = 3500000;
        it('Проверка на массив / ' + format(ops.array), function(done) {
            new Benchmark.Suite()
                .add('array', function() {
                    is.array(true, false, []);
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.array
                        ? done(new Error('Slower than ' + format(ops.array)))
                        : done();
                })
                .run({ async: true });
        });

        ops.integerThree = 250000;
        it('Проверка на целое число: три аргумента / ' + format(ops.integerThree), function(done) {
            new Benchmark.Suite()
                .add('integer: 3', function() {
                    is.integer(25, 37, 90);
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.integerThree
                        ? done(new Error('Slower than ' + format(ops.integerThree)))
                        : done();
                })
                .run({ async: true });
        });

        ops.integerOne = 500000;
        it('Проверка на целое число: один аргумент / ' + format(ops.integerOne), function(done) {
            new Benchmark.Suite()
                .add('integer: 1', function() {
                    is.integer(25.5);
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.integerOne
                        ? done(new Error('Slower than ' + format(ops.integerOne)))
                        : done();
                })
                .run({ async: true });
        });

        ops.type = 160000;
        it('Получение типа данных / ' + format(ops.type), function(done) {
            new Benchmark.Suite()
                .add('type', function() {
                    is.type(true, false, 100);
                })
                .on('cycle', function(event) { benchmarks.add(event.target); })
                .on('complete', function(result) {
                    benchmarks.log();

                    result.target.hz < ops.type
                        ? done(new Error('Slower than ' + format(ops.type)))
                        : done();
                })
                .run({ async: true });
        });

    });
});
