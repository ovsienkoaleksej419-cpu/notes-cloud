import { getStore } from "@netlify/blobs";

/**
 * Netlify Edge Function для удаления файла из хранилища "files".
 * Ожидает ключ файла (путь) в параметре строки запроса 'key'.
 *
 * @param {object} event - Объект события Netlify Edge Function.
 * @returns {object} Ответ с кодом 204 (Успешно, без содержимого) или 500 (Ошибка).
 */
export async function handler(event) {
  try {
    const store = getStore("files");

    // Получаем ключ (путь) файла для удаления
    const fileKey = event.queryStringParameters?.key;

    // Проверяем, был ли предоставлен ключ
    if (!fileKey) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: "Параметр 'key' (ключ файла) является обязательным." })
      };
    }

    // Удаляем файл по ключу
    await store.delete(fileKey);

    // Успешное удаление. Используем код 204 No Content.
    return {
      statusCode: 204,
      headers: {
        // Успешное удаление обычно не возвращает тело, но заголовки все равно могут быть установлены.
        "Content-Type": "application/json"
      }
      // body: JSON.stringify({}) - Код 204 не должен иметь тела, поэтому его пропускаем
    };

  } catch (err) {
    // В случае ошибки возвращаем статус 500 с сообщением об ошибке
    console.error("Ошибка при удалении файла:", err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: Не удалось удалить файл: ${err.message} })
    };
  }
}
