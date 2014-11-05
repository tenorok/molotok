definer('array', /** @exports array */ function() {

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
        for(var i = 0, len = elements.length; i < len; i++) {
            if(!~arr.indexOf(elements[i])) {
                arr.push(elements[i]);
            }
        }
        return arr.length;
    };

    return array;

});
