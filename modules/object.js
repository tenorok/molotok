definer('object', /** @exports object */ function(is) {

    /**
     * Модуль работы с объектами.
     *
     * @class
     */
    function object() {}

    /**
     * Расширить объект.
     *
     * @param {object} object Расширяемый объект
     * @param {...object} source Расширяющие объекты
     * @returns {object}
     */
    object.extend = function(object, source) {
        for(var s = 1, sLen = arguments.length; s < sLen; s++) {

            var needHasOwnProperty = false, p;
            for(p in {}) { needHasOwnProperty = true; break; }

            var sourceObj = arguments[s];
            for(p in sourceObj) {
                if(needHasOwnProperty) {
                    if(sourceObj.hasOwnProperty(p)) {
                        object[p] = sourceObj[p];
                    }
                } else {
                    object[p] = sourceObj[p];
                }
            }
        }
        return object;
    };

    /**
     * Расширить объект рекурсивно.
     *
     * @param {object} obj Расширяемый объект
     * @param {...object} source Расширяющие объекты
     * @returns {object}
     */
    object.deepExtend = function(obj, source) {
        for(var s = 1, sLen = arguments.length; s < sLen; s++) {
            var sourceObj = arguments[s],
                keys = Object.keys(sourceObj);

            for(var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i],
                    objVal = obj[key],
                    sourceVal = sourceObj[key],
                    isMapSourceItem = is.map(sourceVal);

                if(is.map(objVal) && isMapSourceItem) {
                    obj[key] = this.deepExtend(objVal, sourceVal);
                } else if(isMapSourceItem) {
                    obj[key] = object.clone(sourceVal);
                } else {
                    obj[key] = sourceVal;
                }
            }
        }
        return obj;
    };

    /**
     * Проверить объект на наличие полей.
     *
     * @param {object} object Объект
     * @returns {boolean}
     */
    object.isEmpty = function(object) {
        return !Object.keys(object || {}).length;
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

    return object;

});
