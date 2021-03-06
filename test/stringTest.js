definer('stringTest', function(assert, string) {
    describe('Модуль string.', function() {

        it('Экранировать строку текста', function() {
            assert.equal(string.escape('\\,"\'\n\r\t\u2028\u2029'), '\\\\,\\"\\\'\\n\\r\\t\\u2028\\u2029');
        });

        it('Разэкранировать строку текста', function() {
            assert.equal(string.unEscape('\\\\,\\"\\\'\\n\\r\\t\\u2028\\u2029'), '\\,"\'\n\r\t\u2028\u2029');
        });

        it('Экранировать html-строку', function() {
            assert.equal(string.htmlEscape('&<>"\'\/'), '&amp;&lt;&gt;&quot;&#39;\/');
        });

        it('Разэкранировать html-строку', function() {
            assert.equal(string.unHtmlEscape('&amp;&lt;&gt;&quot;&#39;\/'), '&<>"\'\/');
        });

        it('Удалить повторяющиеся пробелы', function() {
            assert.equal(string.collapse('Just   text  in    paragraph.'), 'Just text in paragraph.');
        });

        it('Удалить HTML-теги', function() {
            assert.equal(string.stripTags('<p>Text and <a href="#">link</a>.</p>'), 'Text and link.');
        });

        it('Перевести строку в верхний регистр', function() {
            assert.equal(string.upper('abcd'), 'ABCD');
        });

        it('Перевести заданный символ строки в верхний регистр', function() {
            assert.equal(string.upper('abcd', 0), 'Abcd');
            assert.equal(string.upper('abcd', 2), 'abCd');
        });

        it('Перевести несколько символов строки в верхний регистр', function() {
            assert.equal(string.upper('abcd', 0, 2), 'ABcd');
            assert.equal(string.upper('abcd', 2, 4), 'abCD');
        });

        it('Перевести строку в нижний регистр', function() {
            assert.equal(string.lower('ABCD'), 'abcd');
        });

        it('Перевести заданный символ строки в нижний регистр', function() {
            assert.equal(string.lower('ABCD', 0), 'aBCD');
            assert.equal(string.lower('ABCD', 2), 'ABcD');
        });

        it('Перевести несколько символов строки в нижний регистр', function() {
            assert.equal(string.lower('ABCD', 0, 3), 'abcD');
            assert.equal(string.lower('ABCD', 1, 4), 'Abcd');
        });

        it('Повторить строку заданное количество раз', function() {
            assert.equal(string.repeat('a', 4), 'aaaa');
        });

        it('Повторить строку заданное количество раз с указанным разделителем', function() {
            assert.equal(string.repeat('a', 3, '-'), 'a-a-a');
            assert.equal(string.repeat('a', 3, '%%%'), 'a%%%a%%%a');
        });

    });
});
