// netlify/functions/list.js
import { blobs } from "@netlify/blobs";

exports.handler = async function(event, context) {
  try {
    const storage = blobs({ token: process.env.NETLIFY_BLOBS_TOKEN });

    // Получаем префикс и курсор из параметров запроса для пагинации
    const subject = (event.queryStringParameters && event.queryStringParameters.subject) || "";
    const cursor = (event.queryStringParameters && event.queryStringParameters.cursor) || undefined;
    
    const prefix = subject ? `${subject}/` : "";

    // *** ИСПРАВЛЕНИЕ: ДОБАВЛЯЕМ ЛИМИТ ДЛЯ ОГРАНИЧЕНИЯ РАЗМЕРА ОТВЕТА ***
    const listOptions = {
        prefix,
        limit: 1000, // Ограничиваем до 1000 элементов за раз
        cursor: cursor // Для получения следующей страницы данных
    };
    
    // Вызываем storage.list с опциями пагинации
    const listResponse = await storage.list(listOptions);
    
    // Получаем массив элементов из ответа, учитывая возможные вариации SDK
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
