definer('object', /** @exports object */ function(is) {

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

    return object;

});
