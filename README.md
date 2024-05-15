# Ozon - тестовое задание

__Цель__ - реализовать блок Progress для отображения процесса выполнения и его прогресса.

__Условия__:
- API для управления состоянием
- Пригодность для переиспользования
- 3 состояния:
  - Normal - просто показывать прогресс соответственно параметру Value
  - Animated - прогресс неизвестен, просто показывать что что-то делается
  - Hidden - скрыть со страницы
- Без библиотек, фреймворков и шаблонизаторов

## Принятые для реализации решения

Для максимально удобного переиспользования я решил использовать `Custom Elements` и `Shadow DOM API`, весь код для объявления компонента можно найти в папке [circle-loader](./circle-loader) (но `template` необходимо размещать внутри основного html-документа). Это позволило инкапсулировать стили и скрипты для компонента.

Как API для управления состоянием используются аттрибуты html-элемента:
```HTML
<!-- Normal -->
<circle-loader value="50"></circle-loader>

<!-- Animated -->
<circle-loader animated></circle-loader>

<!-- Normal -->
<circle-loader hidden></circle-loader>
```

Также можно переназначать часть стилей элемента с помощью CSS-переменных:
```CSS
circle-loader {
    --color-primary: #000;
    --color-secondary: #ddd;
    --color-background: #fff;

    --stroke-ratio: 0.92;

    --animate-duration: 1s;

    width: 100%;
}
```