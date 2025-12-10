// netlify/functions/list.js

// *** ИСПРАВЛЕНИЕ ОШИБКИ ИМПОРТА: TypeError: (0 , import_blobs.blobs) is not a function
// Используем require вместо import
const { blobs } = require("@netlify/blobs"); 

exports.handler = async function(event, context) {
  try {
    // Инициализация хранилища
    const storage = blobs({ token: process.env.NETLIFY_BLOBS_TOKEN });

    // Получаем префикс и курсор из параметров запроса для пагинации
    const subject = (event.queryStringParameters && event.queryStringParameters.subject) || "";
    const cursor = (event.queryStringParameters && event.queryStringParameters.cursor) || undefined;
    
    const prefix = subject ? `${subject}/` : "";

    // ДОБАВЛЯЕМ ЛИМИТ ДЛЯ ОГРАНИЧЕНИЯ РАЗМЕРА ОТВЕТА (предотвращает Content-Length error)
    const listOptions = {
        prefix,
        limit: 1000, 
        cursor: cursor
    };
    
    // Вызываем storage.list с опциями пагинации
    const listResponse = await storage.list(listOptions);
    
    // Получаем массив элементов
    const items = listResponse.keys || listResponse.blobs || listResponse;

    // Нормализация и форматирование элементов
    const result = (items || []).map(it => {
      const key = it.key || it.name || it.Id || it.Key || it.path || it;
      const name = key.includes("/") ? key.split("/").pop() : key;
      return {
        name,
        path: key,
        size: it.size || it.byteSize || null,
        lastModified: it.lastModified || it.updatedAt || null
      };
    });

    return {
      statusCode: 200,
      // Возвращаем список файлов и курсор для следующей страницы
      body: JSON.stringify({ 
            status: "ok", 
            files: result,
            next_cursor: listResponse.cursor || null
        })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ status: "error", message: String(err) }) };
  }
};
