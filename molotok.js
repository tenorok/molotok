/*!
 * @file Helpers for enjoying the development.
 * @copyright 2014 Artem Kurbatov, tenorok.ru
 * @license MIT license
 * @version 0.1.1
 * @date 6 November 2014
 */
(function(global, undefined) {
var definer = {
export: function(key, value) { return typeof exports === "object" ? module.exports[key] = value : global[key] = value; }
};
var is = (function () {

    /**
     * Модуль работы с типами данных.
     *
     * @class
     */
    function is() {}

    /**
     * Строковое представление классов типов данных.
     *
     * @type {object}
     */
    is.class = {
        string: '[object String]',
        number: '[object Number]',
        boolean: '[object Boolean]',
        array: '[object Array]',
        object: '[object Object]',
        func: '[object Function]',
        date: '[object Date]',
        regexp: '[object RegExp]',
        arguments: '[object Arguments]',
        error: '[object Error]'
    };

    /**
     * Нативный метод приведения к строковому представлению.
     *
     * @type {function}
     */
    is.toString = Object.prototype.toString;

    /**
     * Регулярное выражение для проверки функции на нативную.
     *
     * @type {regexp}
     */
    is.reNative = RegExp('^' +
        String(is.toString)
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .replace(/toString| for [^\]]+/g, '.*?') + '$'
    );

    /**
     * Проверить параметры на строку.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.string = function(subject) {
        return is._primitive(arguments, 'string');
    };

    /**
     * Проверить параметры на число.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.number = function(subject) {
        return !is.nan.apply(this, arguments) && is._primitive(arguments, 'number');
    };

    /**
     * Проверить параметры на целое число.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.integer = function(subject) {
        return is.number.apply(this, arguments) && is._every(arguments, function() {
            return this % 1 === 0;
        });
    };

    /**
     * Проверить параметры на дробное число.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.float = function(subject) {
        return is.number.apply(this, arguments) && is._every(arguments, function() {
            return this % 1 !== 0;
        });
    };

    /**
     * Проверить параметры на NaN.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.nan = function(subject) {
        return is._every(arguments, function(n) {
            return typeof n === 'number' && isNaN(n) && !is.undefined(n);
        });
    };

    /**
     * Проверить параметры на логический тип.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.boolean = function(subject) {
        return is._primitive(arguments, 'boolean');
    };

    /**
     * Проверить параметры на null.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.null = function(subject) {
        return is._every(arguments, function(n) {
            return n === null;
        });
    };

    /**
     * Проверить параметры на undefined.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.undefined = function(subject) {
        return is._every(arguments, function(u) {
            return typeof u === 'undefined';
        });
    };

    /**
     * Проверить параметры на примитив.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.primitive = function(subject) {
        return is._every(arguments, function(p) {
            return is.string(p) || is.number(p) || is.nan(p) || is.boolean(p) || is.null(p) || is.undefined(p);
        });
    };

    /**
     * Проверить параметры на массив.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.array = function(subject) {
        return is._every(arguments, function() {
            return Array.isArray(this);
        });
    };

    /**
     * Проверить параметры на аргументы.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.argument = function(subject) {
        return is._every(arguments, function() {
            return typeof this === 'object' && typeof this.length === 'number' &&
                is._isToString(this, 'arguments') || false;
        });
    };

    /**
     * Проверить параметры на функцию.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.function = function(subject) {
        return is._every(arguments, function() {
            return typeof this === 'function';
        });
    };

    /**
     * Проверить параметры на нативную функцию.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.native = function(subject) {
        return is._every(arguments, function() {
            return is.function(this) && is.reNative.test(this);
        });
    };

    /**
     * Проверить параметры на простой объект (хэш/карту).
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.map = function(subject) {
        return is._every(arguments, function() {
            if(!is._isToString(this, 'object') || is.argument(this)) {
                return false;
            }

            if(is.native(this.valueOf)) {
                var protoOfValueOf = Object.getPrototypeOf(this.valueOf);
                if(protoOfValueOf) {
                    var protoOfprotoOfValueOf = Object.getPrototypeOf(protoOfValueOf);
                    if(protoOfprotoOfValueOf) {
                        return this === protoOfprotoOfValueOf || Object.getPrototypeOf(this) === protoOfprotoOfValueOf;
                    }
                }
            }

            var keys = Object.keys(this),
                last = keys[keys.length - 1];

            return is.undefined(last) || this.hasOwnProperty(last);
        });
    };

    /**
     * Проверить параметры на дату.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.date = function(subject) {
        return is._every(arguments, function() {
            return typeof this === 'object' && is._isToString(this, 'date') || false;
        });
    };

    /**
     * Проверить параметры на регулярное выражение.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.regexp = function(subject) {
        return is._every(arguments, function() {
            return (is.function(this) || typeof this === 'object') && is._isToString(this, 'regexp') || false;
        });
    };

    /**
     * Узнать тип параметров.
     *
     * Для параметров различных типов данных
     * будет возвращён `mixed`.
     *
     * @param {...*} subject Параметры
     * @returns {string}
     */
    is.type = function(subject) {
        var firstType,
            types = ['string', 'number', 'nan', 'boolean', 'null', 'undefined', 'array',
                'argument', 'native', 'function', 'map', 'date', 'regexp'];

        for(var i = 0, len = types.length; i < len; i++) {
            var type = types[i];
            if(is[type](arguments[0])) {
                firstType = type;
                break;
            }
        }

        return is._every(arguments, function(that) {
            return is[firstType](that);
        }) ? firstType : 'mixed';
    };

    /**
     * Проверить параметры на единый тип данных.
     *
     * @param {...*} subject Параметры
     * @returns {boolean}
     */
    is.every = function(subject) {
        return is.type.apply(this, arguments) !== 'mixed';
    };

    /**
     * Проверить параметры на указанный примитивный тип данных.
     *
     * @private
     * @param {arguments} args Аргументы базового метода
     * @param {string} type Тип данных для проверки
     * @returns {boolean}
     */
    is._primitive = function(args, type) {
        return is._every(args, function() {
            return typeof this === type || typeof this === 'object' && is._isToString(this, type) || false;
        });
    };

    /**
     * Запустить цикл `every` по аргументам функции.
     *
     * @private
     * @param {arguments} args Аргументы
     * @param {is~everyCallback} callback Колбек
     * @returns {boolean}
     */
    is._every = function(args, callback) {
        for(var i = 0, len = args.length; i < len; i++) {
            var a = args[i];
            if(!callback.call(a, a)) {
                return false;
            }
        }
        return true;
    };

    /**
     * Колбек вызывается для каждого аргумента функции
     * в переборе через `every` методом `is._every`.
     *
     * Колбек должен вернуть логическое значение
     * для прерывания или продолжения выполнения цикла.
     *
     * @callback is~everyCallback
     * @this {*} subject Аргумент
     * @param {*} subject Аргумент
     * @returns {boolean}
     */

    /**
     * Проверить строковое представление объекта
     * на заданный класс типа данных.
     *
     * @private
     * @param {subject} subject Объект
     * @param {string} type Имя класса типа данных
     * @returns {boolean}
     */
    is._isToString = function(subject, type) {
        return is.toString.call(subject) === is.class[type];
    };

    return is;

}).call(global),
array = (function (is) {

    /**
     * Модуль работы с массивами.
     *
     * @class
     */
    function array() {}

    /**
     * Добавить элементы в массив без повтора.
     * Дополненный аналог стандартного метода `Array.prototype.push`.
     *
     * @param {array} arr Массив
     * @param {...*} element Элементы для добавления
     * @returns {number} Количество элементов в массиве
     */
    array.pushOnce = function(arr, element) {
        var elements = Array.prototype.slice.call(arguments, 1);
        for(var i = 0; i < elements.length; i++) {
            if(!~arr.indexOf(elements[i])) {
                arr.push(elements[i]);
            }
        }
        return arr.length;
    };

    /**
     * Добавить отдельные элементы и элементы других массивов в массив без повтора.
     * Дополненный аналог стандартного метода `Array.prototype.concat`.
     *
     * @param {array} arr Массив
     * @param {...*} element Элементы для добавления
     * @returns {array} Новый массив
     */
    array.concatOnce = function(arr, element) {
        var elements = Array.prototype.slice.call(arguments, 1),
            newArr = arr.slice();

        for(var i = 0; i < elements.length; i++) {
            if(is.array(elements[i])) {
                for(var j = 0; j < elements[i].length; j++) {
                    this.pushOnce(newArr, elements[i][j]);
                }
            } else {
                this.pushOnce(newArr, elements[i]);
            }
        }

        return newArr;
    };

    return array;

}).call(global, is),
functions = (function () {

    /**
     * Модуль работы с функциями.
     *
     * @class
     */
    function functions() {}

    /**
     * Создать экземпляр класса с помощью apply.
     *
     * @param {Function} constructor Класс
     * @param {array} args Массив аргументов
     * @returns {Object} Экземпляр класса
     */
    functions.apply = function(constructor, args) {
        function F() {
            return constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    };

    return functions;

}).call(global),
string = (function (is) {

    /**
     * Модуль работы со строками.
     *
     * @class
     */
    function string() {}

    /**
     * Заэкранировать строку текста.
     *
     * @param {string} string Строка
     * @returns {string}
     */
    string.escape = function(string) {
        var stringEscapes = {
            '\\': '\\',
            '"': '"',
            '\'': '\'',
            '\n': 'n',
            '\r': 'r',
            '\t': 't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };

        return string.replace(/["'\n\r\t\u2028\u2029\\]/g, function(match) {
            return '\\' + stringEscapes[match];
        });
    };

    /**
     * Разэкранировать строку текста.
     *
     * @param {string} string Строка
     * @returns {string}
     */
    string.unEscape = function(string) {
        var stringEscapes = {
            '\\\\': '\\',
            '\\"': '"',
            '\\\'': '\'',
            '\\n': '\n',
            '\\r': '\r',
            '\\t': '\t',
            '\\u2028': '\u2028',
            '\\u2029': '\u2029'
        };

        return string.replace(/\\"|\\'|\\n|\\r|\\t|\\u2028|\\u2029|\\\\/g, function(match) {
            return stringEscapes[match];
        });
    };

    /**
     * Заэкранировать html-строку.
     *
     * @param {string} string Строка
     * @returns {string}
     */
    string.htmlEscape = function(string) {
        var htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;'
        };

        return string.replace(/[&<>"']/g, function(match) {
            return htmlEscapes[match];
        });
    };

    /**
     * Деэкранировать html-строку.
     *
     * @param {string} string Строка
     * @returns {string}
     */
    string.unHtmlEscape = function(string) {
        var htmlEscapes = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': '\''
        };

        return string.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, function(match) {
            return htmlEscapes[match];
        });
    };

    /**
     * Удалить повторяющиеся пробелы.
     *
     * @param {string} string Строка
     * @returns {string}
     */
    string.collapse = function(string) {
        return string.replace(/\s+/g, ' ');
    };

    /**
     * Удалить HTML-теги.
     *
     * @param {string} string Строка
     * @returns {string}
     */
    string.stripTags = function(string) {
        return string.replace(/<\/?[^>]+>/gi, '');
    };

    /**
     * Перевести строку или заданный символ в верхний регистр.
     *
     * @param {string} string Строка
     * @param {number} [indexA] Порядковый номер символа
     * @param {number} [indexB] Порядковый номер символа для указания промежутка
     * @returns {string}
     */
    string.upper = function(string, indexA, indexB) {
        return this._changeCase('toUpperCase', string, indexA, indexB);
    };

    /**
     * Перевести строку или заданный символ в нижний регистр.
     *
     * @param {string} string Строка
     * @param {number} [indexA] Порядковый номер символа
     * @param {number} [indexB] Порядковый номер символа для указания промежутка
     * @returns {string}
     */
    string.lower = function(string, indexA, indexB) {
        return this._changeCase('toLowerCase', string, indexA, indexB);
    };

    /**
     * Перевести строку или заданный символ в указанный регистр.
     *
     * @private
     * @param {string} method Имя метода для смены регистра
     * @param {string} string Строка
     * @param {number} [indexA] Порядковый номер символа
     * @param {number} [indexB] Порядковый номер символа для указания промежутка
     * @returns {string}
     */
    string._changeCase = function(method, string, indexA, indexB) {
        if(is.undefined(indexA)) {
            return string[method]();
        }

        if(is.undefined(indexB)) {
            return string.slice(0, indexA) +
                string.charAt(indexA)[method]() +
                string.substring(indexA + 1);
        }

        return string.slice(0, indexA) +
            string.substring(indexA, indexB)[method]() +
            string.substring(indexB);
    };

    /**
     * Повторить строку заданное количество раз с указанным разделителем.
     *
     *
     * @param {string} string Строка
     * @param {number} n Количество повторений
     * @param {string} [separator] Разделитель
     * @returns {string}
     */
    string.repeat = function(string, n, separator) {
        separator = separator || '';
        return new Array(n + 1).join(separator + string).slice(separator.length);
    };

    return string;

}).call(global, is),
number = (function (is) {

    /**
     * Модуль работы с числами.
     *
     * @class
     */
    function number() {}

    /**
     * Получить случайное число.
     *
     * При вызове без аргументов возвращает
     * случайное дробное число от 0 до 1.
     *
     * При вызове с указанием минимума и максимума
     * возвращает дробное число из этого промежутка.
     *
     * При вызове со всеми тремя аргументами возвращает
     * дробное число из заданного промежутка,
     * делящееся без остатка на указанный шаг.
     *
     * @param {number} [min] Минимум
     * @param {number} [max] Максимум
     * @param {number} [step] Шаг
     * @returns {number}
     */
    number.random = function(min, max, step) {

        if(is.undefined(min) && is.undefined(max)) {
            return Math.random();
        }

        if(is.undefined(step)) {
            return Math.random() * (max - min) + min;
        }

        return (Math.floor(Math.random() * (max - min) / step) * step) + min;
    };

    return number;

}).call(global, is),
object = (function (is) {

    /**
     * Модуль работы с объектами.
     *
     * @class
     */
    function object() {}

    /**
     * Проверить необходимость использования hasOwnProperty
     * при переборе свойств объекта.
     *
     * @param {object} obj Объект для проверки
     * @returns {boolean}
     */
    object.isNeedHasOwnProperty = function(obj) {
        for(key in {}) return true;
        for(var key in Object.getPrototypeOf(obj)) return true;
        return false;
    };

    /**
     * Расширить объект.
     *
     * @param {object} original Расширяемый объект
     * @param {...object} source Расширяющие объекты
     * @returns {object}
     */
    object.extend = function(original, source) {
        for(var s = 1, sLen = arguments.length; s < sLen; s++) {
            var sourceObj = arguments[s],
                key;

            if(this.isNeedHasOwnProperty(sourceObj)) {
                for(key in sourceObj) if(this.hasOwnProperty(sourceObj, key)) original[key] = sourceObj[key];
            } else {
                for(key in sourceObj) original[key] = sourceObj[key];
            }
        }
        return original;
    };

    /**
     * Расширить объект рекурсивно.
     *
     * @param {object} original Расширяемый объект
     * @param {...object} source Расширяющие объекты
     * @returns {object}
     */
    object.deepExtend = function(original, source) {
        for(var s = 1, sLen = arguments.length; s < sLen; s++) {
            this.each(arguments[s], function(key, sourceVal) {
                var objVal = original[key],
                    isMapSourceItem = is.map(sourceVal);

                if(is.map(objVal) && isMapSourceItem) {
                    original[key] = this.deepExtend(objVal, sourceVal);
                } else if(isMapSourceItem) {
                    original[key] = this.deepClone(sourceVal);
                } else {
                    original[key] = sourceVal;
                }
            }, this);
        }
        return original;
    };

    /**
     * Проверить объект на наличие полей.
     *
     * @param {object} obj Объект для проверки
     * @returns {boolean}
     */
    object.isEmpty = function(obj) {
        obj = obj || {};
        var needHasOwnProperty = this.isNeedHasOwnProperty(obj);
        for(var key in obj) {
            if(needHasOwnProperty && !obj.hasOwnProperty(key)) continue;
            return false;
        }
        return true;
    };

    /**
     * Клонировать объект.
     *
     * @param {object} obj Объект
     * @returns {object}
     */
    object.clone = function(obj) {
        return this.extend({}, obj);
    };

    /**
     * Клонировать объект рекурсивно.
     *
     * @param {object} obj Объект
     * @returns {object}
     */
    object.deepClone = function(obj) {
        return this.deepExtend({}, obj);
    };

    /**
     * Проверить принадлежность свойства
     * объекту с помощью hasOwnProperty.
     *
     * @param {object} obj Объект для проверки
     * @param {string} property Свойство
     * @returns {boolean}
     */
    object.hasOwnProperty = function(obj, property) {
        return Object.prototype.hasOwnProperty.call(obj, property);
    };

    /**
     * Колбек вызывается для каждого ключа объекта
     * при переборе методами `each` и `deepEach`.
     *
     * @callback object~eachCallback
     * @param {string} key Ключ
     * @param {*} val Значение
     * @param {object} Перебираемый объект
     * @returns {undefined|*} При возвращении любого значения, кроме `undefined`,
     * перебор останавливается и метод `each` возвращает это значение
     */

    /**
     * Проитерироваться по ключам объекта.
     *
     * @param {object} obj Объект
     * @param {object~eachCallback} callback Колбек
     * @param {object} [context=obj] Контекст вызова колбека (По умолчанию: итерируемый объект)
     * @returns {*}
     */
    object.each = function(obj, callback, context) {
        var key,
            result;

        if(this.isNeedHasOwnProperty(obj)) {
            for(key in obj) if(this.hasOwnProperty(obj, key)) {
                result = callback.call(context || obj, key, obj[key], obj);
                if(result !== undefined) return result;
            }
        } else {
            for(key in obj) {
                result = callback.call(context || obj, key, obj[key], obj);
                if(result !== undefined) return result;
            }
        }
    };

    /**
     * Проитерироваться по ключам объекта рекурсивно.
     *
     * @param {object} obj Объект
     * @param {object~eachCallback} callback Колбек
     * @param {object} [context=obj] Контекст вызова колбека (По умолчанию: итерируемый объект)
     * @returns {*}
     */
    object.deepEach = function(obj, callback, context) {
        var key,
            val,
            result,
            deepResult,
            needHasOwnProperty = this.isNeedHasOwnProperty(obj);

        for(key in obj) {
            if(needHasOwnProperty && !obj.hasOwnProperty(key)) continue;
            val = obj[key];
            if(is.map(val)) {
                deepResult = this.deepEach(val, callback, context);
                if(deepResult !== undefined) return deepResult;
                continue;
            }
            result = callback.call(context || obj, key, val, obj);
            if(result !== undefined) return result;
        }
    };

    /**
     * Колбек вызывается для каждого ключа объекта
     * при переборе методами `map` и `deepMap`.
     *
     * @callback object~mapCallback
     * @param {string} key Ключ
     * @param {*} val Значение
     * @param {object} obj Перебираемый объект
     * @returns {*} Значение поля
     */

    /**
     * Модифицировать значения каждого ключа заданного объекта.
     *
     * @param {object} obj Объект
     * @param {object~mapCallback} callback Колбек
     * @param {object} [context=obj] Контекст вызова колбека (По умолчанию: итерируемый объект)
     * @returns {object} Модифицированный объект
     */
    object.map = function(obj, callback, context) {
        this.each(obj, function(key) {
            obj[key] = callback.apply(this, arguments);
        }, context);
        return obj;
    };

    /**
     * Модифицировать значения каждого ключа заданного объекта рекурсивно.
     *
     * @param {object} obj Объект
     * @param {object~mapCallback} callback Колбек
     * @param {object} [context=obj] Контекст вызова колбека (По умолчанию: итерируемый объект)
     * @returns {object} Модифицированный объект
     */
    object.deepMap = function(obj, callback, context) {
        this.deepEach(obj, function(key, val, curObj) {
            curObj[key] = callback.apply(this, arguments);
        }, context);
        return obj;
    };

    return object;

}).call(global, is),
molotok = definer.export("molotok", (function (
        is, string, number, array, object, functions
    ) {

    return {
        is: is,
        string: string,
        number: number,
        array: array,
        object: object,
        functions: functions
    };

}).call(global, is, string, number, array, object, functions));
})(this);