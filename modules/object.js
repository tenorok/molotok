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
            var sourceObj = arguments[s],
                sourceKeys = Object.keys(sourceObj);
            for(var i = 0, len = sourceKeys.length; i < len; i++) {
                var sourceKey = sourceKeys[i];
                object[sourceKey] = sourceObj[sourceKey];
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
        return [].slice.call(arguments, 1).reduce(function(object, source) {
            return Object.keys(source).reduce(function(extended, key) {
                var extendedItem = extended[key],
                    sourceItem = source[key],
                    isMapSourceItem = is.map(sourceItem);

                if(is.map(extendedItem) && isMapSourceItem) {
                    extended[key] = this.deepExtend(extendedItem, sourceItem);
                } else if(isMapSourceItem) {
                    extended[key] = object.clone(sourceItem);
                } else {
                    extended[key] = sourceItem;
                }

                return extended;
            }.bind(this), obj);
        }.bind(this), object);
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
