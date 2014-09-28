definer('string', /** @exports string */ function(is) {

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

});
