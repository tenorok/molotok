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

        it('Проверить объекты на идентичность', function() {
            assert.isTrue(object.isEqual({ a: 1 }, { a: 1 }));
            assert.isFalse(object.isEqual({ a: 1 }, { a: 2 }));
            assert.isFalse(object.isEqual({ a: 1 }, { b: 2, c: 3 }));
            assert.isFalse(object.isEqual({ a: 'a', b: true }, { a: 'a', b: true, c: false }));
            assert.isFalse(object.isEqual({ a: 'a', b: true, c: false }, { a: 'a', b: true }));
        });

        it('Получить количество собственных полей объекта', function() {
            assert.equal(object.size({ a: 1, b: 2, c: 3 }), 3);
            function Foo() {
                this.a = 1;
                this.c = 3;
            }
            Foo.prototype.b = 2;
            assert.equal(object.size(new Foo), 2);
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

        it('Клонировать глубокий объект рекурсивно', function() {
            var o = {
                    a: 10,
                    c: {
                        c1: 20,
                        c3: {
                            c31: 30
                        },
                        c4: 40
                    },
                    d: 50
                },
                o2 = object.deepClone(o);

            o2.c.c3.c31 = 35;
            assert.equal(o.c.c3.c31, 30);
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
            var items = [],
                iterateObj = { a: 'first', b: 100, c: true, d: null };
            object.each(iterateObj, function(key, val, obj) {
                items.push({ key: key, val: val });
                assert.deepEqual(obj, iterateObj);
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

        it('Проверить контекст в колбеке итерирования по объекту', function() {
            var obj = { a: 1 };
            object.each(obj, function() {
                assert.deepEqual(this, obj);
            });
        });

        it('Проитерироваться по объекту с указанием контекста', function() {
            var context = {};
            object.each({ a: 1 }, function() {
                assert.deepEqual(this, context);
            }, context);
        });

        it('Проитерироваться по объекту и прервать перебор', function() {
            var vals = [];
            assert.isFalse(object.each({ a: 1, b: 2, c: 3, d: 4 }, function(key, val) {
                if(val === 3) return false;
                vals.push(val);
            }));
            assert.deepEqual(vals, [1, 2]);
        });

        it('Рекурсивно проитерироваться по объекту', function() {
            var items = [],
                iterateObj = {
                    a: 'first',
                    b: { b1: 100, b2: { b21: 200 }},
                    c: { c1: { c11: true, c12: false }, c2: 'second' },
                    d: null
                };
            object.deepEach(iterateObj, function(key, val, obj) {
                items.push({ key: key, val: val });
                switch(key) {
                    case 'a':
                    case 'b':
                    case 'c':
                    case 'd':
                        assert.deepEqual(obj, iterateObj);
                        break;
                    case 'b1':
                    case 'b2':
                        assert.deepEqual(obj, { b1: 100, b2: { b21: 200 }});
                        break;
                    case 'b21':
                        assert.deepEqual(obj, { b21: 200 });
                        break;
                    case 'c1':
                    case 'c2':
                        assert.deepEqual(obj, { c1: { c11: true, c12: false }, c2: 'second' });
                        break;
                    case 'c11':
                    case 'c12':
                        assert.deepEqual(obj, { c11: true, c12: false });
                        break;
                }
            });
            assert.deepEqual(items, [
                { key: 'a', val: 'first' },
                { key: 'b1', val: 100 },
                { key: 'b21', val: 200 },
                { key: 'c11', val: true },
                { key: 'c12', val: false },
                { key: 'c2', val: 'second' },
                { key: 'd', val: null }
            ]);
        });

        it('Рекурсивно проитерироваться по объекту с прототипом', function() {

            Object.prototype.z = 100;

            var items = [];
            object.deepEach({
                a: 100,
                b: {
                    b1: 200,
                    b2: {
                        b21: 20,
                        b22: true
                    }
                }
            }, function(key, val) {
                items.push({ key: key, val: val });
            });
            assert.deepEqual(items, [
                { key: 'a', val: 100 },
                { key: 'b1', val: 200 },
                { key: 'b21', val: 20 },
                { key: 'b22', val: true }
            ]);

            delete Object.prototype.z;
        });

        it('Проверить контекст в колбеке рекурсивного итерирования по объекту', function() {
            var obj = { a: 1 };
            object.deepEach(obj, function() {
                assert.deepEqual(this, obj);
            });
        });

        it('Рекурсивно проитерироваться по объекту с указанием контекста', function() {
            var context = {};
            object.deepEach({ a: 1 }, function() {
                assert.deepEqual(this, context);
            }, context);
        });

        it('Рекурсивно проитерироваться по объекту и прервать перебор', function() {
            var vals = [];
            assert.isFalse(object.deepEach({
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
            }, function(key, val) {
                if(val === true) return false;
                vals.push(val);
            }, context));
            assert.deepEqual(vals, [100, 'first', 200, false, 20]);
        });

        it('Метод map', function() {
            var o = { a: 1, b: 2, c: 3 },
                result = { a: undefined, b: 4, c: 6 },
                context = {};
            assert.deepEqual(object.map(o, function(key, val, obj) {
                assert.deepEqual(this, context);
                assert.deepEqual(obj, o);
                if(key !== 'a') return val * 2;
            }, context), result);
            assert.deepEqual(o, result);
        });

        it('Метод deepMap', function() {
            var o = {
                    a: 10,
                    c: {
                        c1: 20,
                        c3: {
                            c31: 30
                        },
                        c4: 40
                    },
                    d: 50
                },
                result = {
                    a: 15,
                    c: {
                        c1: 25,
                        c3: {
                            c31: 35
                        },
                        c4: 45
                    },
                    d: 55
                },
                context = {};
            assert.deepEqual(object.deepMap(o, function(key, val, obj) {
                assert.deepEqual(this, context);
                switch(key) {
                    case 'a':
                    case 'd':
                        assert.deepEqual(obj, o);
                        break;
                    case 'c1':
                        assert.deepEqual(obj, {
                            c1: 20,
                            c3: {
                                c31: 30
                            },
                            c4: 40
                        });
                        break;
                    case 'c4':
                        assert.deepEqual(obj, {
                            c1: 25,
                            c3: {
                                c31: 35
                            },
                            c4: 40
                        });
                        break;
                    case 'c31':
                        assert.deepEqual(obj, { c31: 30 });
                        break;
                }
                return val + 5;
            }, context), result);
            assert.deepEqual(o, result);
        });

    });
});
