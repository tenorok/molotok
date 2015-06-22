definer('array', /** @exports array */ function(is) {

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

    /**
     * Клонировать массив.
     *
     * @param {array} arr Массив
     * @returns {array} Новый массив
     */
    array.clone = function(arr) {
        return arr.slice();
    };

    return array;

});
