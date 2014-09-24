definer('objectTest', function(assert, object) {
    describe('Модуль object.', function() {

        it('Расширить объект', function() {
            assert.deepEqual(object.extend({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
        });

        it('Расширить несколько объектов', function() {
            assert.deepEqual(object.extend({ a: 1 }, { b: 2 }, { c: 3 }), { a: 1, b: 2, c: 3 });
            assert.deepEqual(object.extend({ a: 1 }, { b: 2 }, { a: 3 }), { a: 3, b: 2 });
        });

        it('Расширить объект рекурсивно', function() {
            assert.deepEqual(object.deepExtend(
                {
                    a: 1,
                    b: {
                        c: 2,
                        d: {
                            e: 3,
                            f: {
                                g: 4,
                                h: {
                                    i: 5
                                },
                                j: 6
                            }
                        }
                    }
                },
                {
                    a: 6,
                    b: {
                        c: 7,
                        d: {
                            f: {
                                g: 8,
                                h: 9
                            }
                        }
                    }
                }
            ),
                {
                    a: 6,
                    b: {
                        c: 7,
                        d: {
                            e: 3,
                            f: {
                                g: 8,
                                h: 9,
                                j: 6
                            }
                        }
                    }
                }
            );
        });

        it('Расширить несколько объектов рекурсивно', function() {
            assert.deepEqual(object.deepExtend(
                {
                    a: 1,
                    b: {
                        c: 3,
                        d: {
                            e: 4
                        }
                    },
                    f: {
                        g: 5
                    }
                },
                {
                    b: {
                        c: 4
                    }
                },
                {
                    b: {
                        d: {
                            e: 5
                        }
                    },
                    f: {
                        g: 6,
                        h: 7
                    }
                }
            ),
                {
                    a: 1,
                    b: {
                        c: 4,
                        d: {
                            e: 5
                        }
                    },
                    f: {
                        g: 6,
                        h: 7
                    }
                }
            );
        });

        it('Перебрать для расширения только собственные свойства объекта', function() {
            Object.prototype.z = 100;
            assert.equal(JSON.stringify(object.extend({ a: 1 }, { b: 2 })), JSON.stringify({ a: 1, b: 2 }));
            delete Object.prototype.z;
        });

        it('Расширить объект только собственными свойствами экземпляра функции', function() {
            function Foo() {
                this.a = 1;
                this.c = 3;
            }
            Foo.prototype.b = 2;
            assert.deepEqual(object.extend({}, new Foo), { a: 1, c: 3 });
        });

        it('Перетереть свойства расширяемого объекта', function() {
            var expected = { a: 3, b: 2, c: null };
            assert.deepEqual(object.extend({ a: 1, b: 2 }, expected), expected);
        });

        it('Проверить объект на наличие полей', function() {
            assert.isTrue(object.isEmpty({}));
            assert.isFalse(object.isEmpty({ a: 1 }));
            function Foo() {}
            Foo.prototype.a = 1;
            assert.isTrue(object.isEmpty(Foo));
        });

        it('Проверка на наличие полей должна уметь обрабатывать отсутствие объекта', function() {
            assert.isTrue(object.isEmpty());
            assert.isTrue(object.isEmpty(null));
            assert.isTrue(object.isEmpty(undefined));
        });

        it('Клонировать объект', function() {
            var a = {},
                b = object.clone(a);
            b.foo = 100;
            assert.isUndefined(a.foo);
        });

        it('Клонировать объект рекурсивно', function() {
            var a = { b: { c: 100 }},
                d = object.deepClone(a);

            d.b.c = 200;
            assert.equal(a.b.c, 100);
        });

        it('Проверить необходимость использования hasOwnProperty', function() {
            assert.isFalse(object.isNeedHasOwnProperty({}));

            function Foo() {}
            assert.isFalse(object.isNeedHasOwnProperty(new Foo));
            Foo.prototype.a = 1;
            assert.isTrue(object.isNeedHasOwnProperty(new Foo));

            Object.prototype.z = 100;
            assert.isTrue(object.isNeedHasOwnProperty({}));
            delete Object.prototype.z;
        });

        it('Проитерироваться по объекту', function() {
            var items = [];
            object.each({ a: 'first', b: 100, c: true, d: null }, function(key, val) {
                items.push({ key: key, val: val });
            });
            assert.deepEqual(items, [
                { key: 'a', val: 'first' },
                { key: 'b', val: 100 },
                { key: 'c', val: true },
                { key: 'd', val: null }
            ]);
        });

        it('Проитерироваться по объекту с прототипом', function() {

            function Foo() {
                this.a = 20;
                this.b = true;
            }
            Foo.prototype = { hasOwnProperty: null, p: 500 };

            var items = [];
            object.each(new Foo(), function(key, val) {
                items.push({ key: key, val: val });
            });
            assert.deepEqual(items, [
                { key: 'a', val: 20 },
                { key: 'b', val: true }
            ]);
        });

        it('Проитерироваться по объекту с указанием контекста', function() {
            var context = {};
            object.each({ a: 1 }, function() {
                assert.deepEqual(this, context);
            }, context);
        });

        it('Проитерироваться по объекту и прервать перебор', function() {
            var vals = [];
            object.each({ a: 1, b: 2, c: 3, d: 4 }, function(key, val) {
                if(val === 3) return false;
                vals.push(val);
            }, context);
            assert.deepEqual(vals, [1, 2]);
        });

    });
});
