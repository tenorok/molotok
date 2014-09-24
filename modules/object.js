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
     * @param {object} original Объект для перебора
     * @returns {boolean}
     */
    object.isNeedHasOwnProperty = function(original) {
        for(key in {}) return true;
        for(var key in Object.getPrototypeOf(original)) return true;
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
                needHasOwnProperty = object.isNeedHasOwnProperty(sourceObj);
            for(var key in sourceObj) {
                if(needHasOwnProperty && !sourceObj.hasOwnProperty(key)) continue;
                original[key] = sourceObj[key];
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
            var sourceObj = arguments[s],
                needHasOwnProperty = object.isNeedHasOwnProperty(sourceObj);

            for(var key in sourceObj) {
                if(needHasOwnProperty && !sourceObj.hasOwnProperty(key)) continue;

                var objVal = original[key],
                    sourceVal = sourceObj[key],
                    isMapSourceItem = is.map(sourceVal);

                if(is.map(objVal) && isMapSourceItem) {
                    original[key] = this.deepExtend(objVal, sourceVal);
                } else if(isMapSourceItem) {
                    original[key] = object.clone(sourceVal);
                } else {
                    original[key] = sourceVal;
                }
            }
        }
        return original;
    };

    /**
     * Проверить объект на наличие полей.
     *
     * @param {object} original Объект
     * @returns {boolean}
     */
    object.isEmpty = function(original) {
        original = original || {};
        var needHasOwnProperty = object.isNeedHasOwnProperty(original);
        for(var key in original) {
            if(needHasOwnProperty && !original.hasOwnProperty(key)) continue;
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
        return object.extend({}, obj);
    };

    /**
     * Клонировать объект рекурсивно.
     *
     * @param {object} obj Объект
     * @returns {object}
     */
    object.deepClone = function(obj) {
        return object.deepExtend({}, obj);
    };

    /**
     * Закешированный метод hasOwnProperty.
     *
     * @type {function}
     */
    object.hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * Колбек вызывается для каждого ключа объекта
     * при переборе методом `each`.
     *
     * @callback object~eachCallback
     * @param {string} key Ключ
     * @param {*} val Значение
     */

    /**
     * Проитерироваться по ключам объекта.
     *
     * @param {object} obj Объект
     * @param {object~eachCallback} callback Колбек
     * @param {object} [context] Контекст вызова колбека
     */
    object.each = function(obj, callback, context) {
        var key;

        if(object.isNeedHasOwnProperty(obj)) {
            for(key in obj) if(object.hasOwnProperty.call(obj, key)) {
                callback.call(context || this, key, obj[key]);
            }
        } else {
            for(key in obj) {
                callback.call(context || this, key, obj[key]);
            }
        }
    };

    return object;

});
