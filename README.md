# Molotok — набор помощников для эффективной разработки

Для организации модулей используется [definer](https://github.com/tenorok/definer).

[Документация в JSDoc](http://tenorok.github.io/molotok/jsdoc/module-is-is.html).

Готовые файлы:

* [molotok.js](http://tenorok.github.io/molotok/release/molotok.js)
* [molotok.min.js](http://tenorok.github.io/molotok/release/molotok.min.js)



## Установка

Molotok доступен в [Bower](http://bower.io).

    bower install molotok

Molotok доступен в [NPM](https://www.npmjs.org).

    npm install molotok

## Подключение

### В браузере

```html
<script src="bower_components/molotok/molotok.min.js"></script>
```

### В Node.js

```js
var molotok = require('molotok');
```

## Модули

- [Модуль `is`](#Модуль-is)
  - [Методы для проверки на определённый тип данных](#Методы-для-проверки-на-определённый-тип-данных)
  - [Метод `is.type`](#Метод-istype)
  - [Методы для проверки чисел](#Методы-для-проверки-чисел)
  - [Метод `is.primitive`](#Метод-isprimitive)
  - [Метод `is.every`](#Метод-isevery)
- [Модуль `string`](#Модуль-string)
  - [Метод `string.escape`](#Метод-stringescape)
  - [Метод `string.unEscape`](#Метод-stringunescape)
  - [Метод `string.htmlEscape`](#Метод-stringhtmlescape)
  - [Метод `string.unHtmlEscape`](#Метод-stringunhtmlescape)
  - [Метод `string.collapse`](#Метод-stringcollapse)
  - [Метод `string.stripTags`](#Метод-stringstriptags)
  - [Метод `string.upper`](#Метод-stringupper)
  - [Метод `string.lower`](#Метод-stringlower)
  - [Метод `string.repeat`](#Метод-stringrepeat)
- [Модуль `number`](#Модуль-number)
  - [Метод `number.random`](#Метод-numberrandom)
- [Модуль `array`](#Модуль-array)
  - [Метод `array.pushOnce`](#Метод-arraypushonce)
  - [Метод `array.concatOnce`](#Метод-arrayconcatonce)
- [Модуль `object`](#Модуль-object)
  - [Метод `object.isNeedHasOwnProperty`](#Метод-objectisneedhasownproperty)
  - [Метод `object.hasOwnProperty`](#Метод-objecthasownproperty)
  - [Метод `object.size`](#Метод-objectsize)
  - [Метод `object.isEmpty`](#Метод-objectisempty)
  - [Метод `object.isEqual`](#Метод-objectisequal)
  - [Метод `object.isDeepEqual`](#Метод-objectisdeepequal)
  - [Метод `object.extend`](#Метод-objectextend)
  - [Метод `object.deepExtend`](#Метод-objectdeepextend)
  - [Метод `object.clone`](#Метод-objectclone)
  - [Метод `object.deepClone`](#Метод-objectdeepclone)
  - [Метод `object.each`](#Метод-objecteach)
  - [Метод `object.deepEach`](#Метод-objectdeepeach)
  - [Метод `object.map`](#Метод-objectmap)
  - [Метод `object.deepMap`](#Метод-objectdeepmap)
- [Модуль `functions`](#Модуль-functions)
  - [Метод `functions.apply`](#Метод-functionsapply)

### Модуль `is`

Каждый из методов модуля `is` принимает неограниченное количество параметров.

#### Методы для проверки на определённый тип данных

Если все переданные параметры принадлежат типу данных, на который осуществляется
проверка, методы возвращают `true`, иначе `false`.

Параметры:

* `{...*}` `subject` — параметры

Возвращают: `{boolean}`

Список методов для проверки на определённый тип данных:

* `is.string` — строка
* `is.number` — число
* `is.nan` — NaN
* `is.boolean` — логический тип
* `is.null` — null
* `is.undefined` — undefined
* `is.date` — дата
* `is.regexp` — регулярное выражение
* `is.array` — массив
* `is.map` — простой объект (хэш, карта)
* `is.argument` — аргументы функции
* `is.function` — функция
* `is.native` — системная функция

#### Метод `is.type`

Определяет тип переданных параметров.

Возвращает строку, соответствущую имени одного из методов для проверки
на определённый тип данных, которые перечислены выше.

Возвращает `mixed`, если были переданы параметры разных типов данных.

Параметры:

* `{...*}` `subject` — параметры

Возвращает: `{string}`

#### Методы для проверки чисел

Проверяют параметры на число определённого вида.

Параметры:

* `{...*}` `subject` — параметры

Возвращают: `{boolean}`

Список методов для проверки чисел:

* `is.integer` — целое число
* `is.float` — дробное число

#### Метод `is.primitive`

Проверяет параметры на примитивные типы данных.

В примитивные типы входят: string, number, NaN, boolean, null, undefined.

Параметры:

* `{...*}` `subject` — параметры

Возвращает: `{boolean}`

#### Метод `is.every`

Проверяет параметры на единый тип данных.

Возвращает `true`, если все переданные параметры относятся
к одному типу данных, иначе `false`.

Параметры:

* `{...*}` `subject` — параметры

Возвращает: `{boolean}`

### Модуль `string`

#### Метод `string.escape`

Экранирует строку текста.

Предваряет дополнительным слешом: слеш, кавычки,
символы перевода строки, каретки и табуляции.

Параметры:

* `{string}` `string` — строка

Возвращает: `{string}`

#### Метод `string.unEscape`

Деэкранирует строку текста.

Параметры:

* `{string}` `string` — строка

Возвращает: `{string}`

#### Метод `string.htmlEscape`

Экранирует HTML-строку.

Заменяет на HTML-сущности: амперсанд, угловые скобки и кавычки.

Параметры:

* `{string}` `string` — строка

Возвращает: `{string}`

#### Метод `string.unHtmlEscape`

Деэкранирует HTML-строку.

Параметры:

* `{string}` `string` — строка

Возвращает: `{string}`

#### Метод `string.collapse`

Удаляет повторяющиеся пробелы.

Параметры:

* `{string}` `string` — строка

Возвращает: `{string}`

#### Метод `string.stripTags`

Вырезает HTML-теги.

Параметры:

* `{string}` `string` — строка

Возвращает: `{string}`

#### Метод `string.upper`

Переводит всю строку, заданный символ или промежуток символов
в верхний регистр.

Параметры:

* `{string}` `string` — строка
* `{number}` `[indexA]` — порядковый номер символа
* `{number}` `[indexB]` — порядковый номер символа для указания промежутка

Возвращает: `{string}`

#### Метод `string.lower`

Переводит всю строку, заданный символ или промежуток символов
в нижний регистр.

Параметры:

* `{string}` `string` — строка
* `{number}` `[indexA]` — порядковый номер символа
* `{number}` `[indexB]` — порядковый номер символа для указания промежутка

Возвращает: `{string}`

#### Метод `string.repeat`

Повторяет строку заданное количество раз с указанным разделителем

Параметры:

* `{string}` `string` — строка
* `{number}` `n` — количество повторений
* `{string}` `[separator]` — разделитель, по умолчанию отсутствует

Возвращает: `{string}`

### Модуль `number`

#### Метод `number.random`

Возвращает случайное число.

При вызове без аргументов возвращает случайное дробное число от 0 до 1.

При вызове с указанием минимума и максимума возвращает дробное число из этого промежутка.

При вызове со всеми тремя аргументами возвращает число из заданного промежутка, делящееся без остатка на указанный шаг.

Параметры:

* `{number}` `[min]` — минимум
* `{number}` `[max]` — максимум
* `{number}` `[step]` — шаг

Возвращает: `{number}`

### Модуль `array`

#### Метод `array.pushOnce`

Добавляет элементы в массив без повтора.

Дополненный аналог стандартного метода `Array.prototype.push`.

Параметры:
* `{array}` `array` — массив
* `{...*}` `element` — элементы для добавления

Возвращает: `{number}` — количество элементов в массиве

#### Метод `array.concatOnce`

Добавляет отдельные элементы и элементы других массивов в массив без повтора,
не модифицируя исходный массив.

Дополненный аналог стандартного метода `Array.prototype.concat`.

Параметры:
* `{array}` `array` — массив
* `{...*}` `element` — элементы для добавления

Возвращает: `{array}` — новый массив

### Модуль `object`

#### Метод `object.isNeedHasOwnProperty`

Проверяет необходимость использования `hasOwnProperty` при переборе
свойств объекта циклом `for...in`.

Метод `hasOwnProperty` достаточно затратен и его можно
не использовать без необходимости.

Параметры:
* `{object}` `obj` — объект для проверки

Возвращает: `{boolean}`

#### Метод `object.hasOwnProperty`

Проверяет принадлежность свойства объекту с помощью нативного `hasOwnProperty`.

Этот метод можно уверенно применять для любого объекта,
даже если у него задано поле `hasOwnProperty`.

Параметры:
* `{object}` `obj` — объект для проверки
* `{string}` `property` — свойство

Возвращает: `{boolean}`

#### Метод `object.size`

Возвращает количество собственных полей объекта.

Параметры:
* `{object}` `obj` — объект для подсчёта

Возвращает: `{number}`

#### Метод `object.isEmpty`

Проверяет объект на наличие полей.

Параметры:
* `{object}` `obj` — объект для проверки

Возвращает: `{boolean}`

#### Метод `object.isEqual`

Проверяет объекты на идентичность.

Параметры:

* `{...object}` `obj` — объекты для проверки

Возвращает: `{boolean}`

#### Метод `object.isDeepEqual`

Проверяет объекты на идентичность рекурсивно.

Параметры:

* `{...object}` `obj` — объекты для проверки

Возвращает: `{boolean}`

#### Метод `object.extend`

Расширяет объект.

Параметры:

* `{object}` `obj` — расширяемый объект
* `{...object}` `source` — расширяющие объекты в любом количестве

Возвращает: `{object}`

#### Метод `object.deepExtend`

Расширяет объект рекурсивно.

Параметры:

* `{object}` `obj` — расширяемый объект
* `{...object}` `source` — расширяющие объекты в любом количестве

Возвращает: `{object}`

#### Метод `object.clone`

Клонирует объект.

Параметры:

* `{object}` `obj` — клонируемый объект

Возвращает: `{object}`

#### Метод `object.deepClone`

Клонирует объект рекурсивно.

Параметры:

* `{object}` `obj` — клонируемый объект

Возвращает: `{object}`

#### Метод `object.each`

Перебирает значения объекта.

Параметры:

* `{object}` `obj` — перебираемый объект
* `{function}` `callback` — колбек вызывается для каждого ключа объекта
* `{object}` `[context=obj]` — контекст вызова колбека, по умолчанию перебираемый объект

Параметры колбека:

* `{string}` `key` — ключ перебираемого объекта
* `{*}` `val` — значение ключа
* `{object}` `obj` — перебираемый объект

При возвращении колбеком любого значения, кроме `undefined`,
перебор останавливается и метод `each` возвращает это значение.

Возвращает: `{*}` — результат выполнения колбека

#### Метод `object.deepEach`

Перебирает значения объекта рекурсивно.

Параметры:

* `{object}` `obj` — перебираемый объект
* `{function}` `callback` — колбек вызывается для каждого ключа объекта
* `{object}` `[context=obj]` — контекст вызова колбека, по умолчанию перебираемый объект

Параметры колбека:

* `{string}` `key` — ключ перебираемого объекта
* `{*}` `val` — значение ключа
* `{object}` `obj` — текущий перебираемый объект

При возвращении колбеком любого значения, кроме `undefined`,
перебор останавливается и метод `each` возвращает это значение.

Возвращает: `{*}` — результат выполнения колбека

#### Метод `object.map`

Модифицирует значения каждого ключа заданного объекта.

Параметры:

* `{object}` `obj` — перебираемый объект
* `{function}` `callback` — колбек вызывается для каждого ключа объекта
* `{object}` `[context=obj]` — контекст вызова колбека, по умолчанию перебираемый объект

Параметры колбека:

* `{string}` `key` — ключ перебираемого объекта
* `{*}` `val` — значение ключа
* `{object}` `obj` — перебираемый объект

Возвращаемое колбеком значение устанавливается соответствующему ключу.

Возвращает: `{object}` — модифицированный объект

#### Метод `object.deepMap`

Модифицирует значения каждого ключа заданного объекта рекурсивно.

Параметры:

* `{object}` `obj` — перебираемый объект
* `{function}` `callback` — колбек вызывается для каждого ключа объекта
* `{object}` `[context=obj]` — контекст вызова колбека, по умолчанию перебираемый объект

Параметры колбека:

* `{string}` `key` — ключ перебираемого объекта
* `{*}` `val` — значение ключа
* `{object}` `obj` — текущий перебираемый объект

Возвращаемое колбеком значение устанавливается соответствующему ключу.

Возвращает: `{object}` — модифицированный объект

### Модуль `functions`

#### Метод `functions.apply`

Создаёт экземпляр класса с помощью apply.

Параметры:

* `{Function}` `constructor` — класс
* `{array}` `args` — массив аргументов

Возвращает: `{Object}` — экземпляр класса
