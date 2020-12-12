# Описание API

## GET /api/files/{field}

Получить список файлов для поля **{field}**.

Формат ответа: JSON, структура `[{ id, name }, ...]`


## POST /api/files/{field}

Загрузить новый файл для поля **{field}**.

Формат запроса: multipart/form-data, поле **file**.

Формат ответа: JSON, структура `{ id, name }`


## GET /api/files/{field}/{id}

Скачать файл **{id}**.

Формат ответа: application/octet-stream.


## DELETE /api/files/{field}/{id}

Удалить файл **{id}**.
