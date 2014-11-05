definer('arrayTest', function(assert, array) {
    describe('Модуль array.', function() {

        describe('Метод pushOnce', function() {

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

    });
});
