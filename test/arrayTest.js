definer('arrayTest', function(assert, array) {
    describe('Модуль array.', function() {

        describe('Метод pushOnce.', function() {

            it('Один параметр без повтора', function() {
                var arr = ['a', 'b'];
                assert.equal(array.pushOnce(arr, 'c'), 3);
                assert.deepEqual(arr, ['a', 'b', 'c']);
            });

            it('Один параметр с повтором', function() {
                var arr = ['a', 'b'];
                assert.equal(array.pushOnce(arr, 'b'), 2);
                assert.deepEqual(arr, ['a', 'b']);
            });

            it('Несколько параметров без повтора', function() {
                var arr = ['a', 'b'];
                assert.equal(array.pushOnce(arr, 'c', 'd'), 4);
                assert.deepEqual(arr, ['a', 'b', 'c', 'd']);
            });

            it('Несколько параметров с повтором', function() {
                var arr = ['a', 'b'];
                assert.equal(array.pushOnce(arr, 'b', 'c', 'c', 'd'), 4);
                assert.deepEqual(arr, ['a', 'b', 'c', 'd']);
            });

        });

        describe('Метод concatOnce.', function() {

            it('Один параметр без повтора', function() {
                var arr = ['a', 'b'];
                assert.deepEqual(array.concatOnce(arr, 'c'), ['a', 'b', 'c']);
                assert.deepEqual(arr, ['a', 'b']);
            });

            it('Несколько массивов без повтора', function() {
                var arr = ['a'];
                assert.deepEqual(array.concatOnce(arr, ['b', 'c'], ['d'], 'e'), ['a', 'b', 'c', 'd', 'e']);
                assert.deepEqual(arr, ['a']);
            });

            it('Несколько массивов с повторами', function() {
                var arr = [1];
                assert.deepEqual(array.concatOnce(arr, [2, 1, 2], [3], 4, 5), [1, 2, 3, 4, 5]);
                assert.deepEqual(arr, [1]);
            });

        });

        describe('Метод clone.', function() {

            it('Клонировать массив', function() {
                var a = [],
                    b = array.clone(a);
                b.push(1);
                assert.equal(a.length, 0);
            });

        });

    });
});
