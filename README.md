# Netris, загрузка файлов

## Постановка задачи

Разработать компонент формы, позволяющий прикреплять/просматривать/удалять файлы к объекту.
Поле должно содержать кнопку выбора файла в виде иконки (например, "скрепка") с правой стороны, которая позволяет открыть форму для загрузки файла.

- Если поле множественное, то каждое использование иконки выбрать файл, добавляет дополнительное новое значение, без удаления существующих.
- Если поле НЕ множественное, то каждое использование кнопки выбора файла перезатирает существующее значение.
- Множественные значения должны быть отображены через ";", при этом после последнего значения знак ";" отсутствует.
- Каждый загруженный файл должен иметь кнопку в виде "х", позволяющей удалить файл.
- Загруженные файлы отображены в поле в виде кликабельной ссылки (стиль должен быть общий (один css-класс) для файлов и для ссылочных значений), клик по которой позволяет выгрузить файл;

Результат выполнения задания должен содержать как front-часть, реализующую вышеуказанные требования, так и back-часть, реализующую API, необходимое для функционирования front-части. 

Также см. [Тестовое задание Netris.docx](Тестовое%20задание%20Netris.docx)


## Как запустить

Запускаем сервер:
```
cd server
npm install
npm start
```

Открываем в браузере http://localhost:3000/ пример формы загрузки.

## Описание реализации

- [client/upload.js](client/upload.js) - реализация компонента для клиента
- [server/API.md](server/API.md) - описание API сервера
