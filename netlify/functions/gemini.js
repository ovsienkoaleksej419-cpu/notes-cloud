const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  // 1. Разрешаем браузеру делать запросы (CORS)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Обработка предварительного запроса браузера
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Разрешаем только POST запросы
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers, 
      body: JSON.stringify({ text: "Метод не поддерживается" }) 
    };
  }

  try {
    // 2. Проверка API ключа
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ text: "Ошибка конфигурации: API ключ не найден в Netlify." }) 
      };
    }

    // 3. Получение данных из запроса
    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ text: "Пустой запрос" }) 
      };
    }

    // 4. Инициализация Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Используем базовое название модели без лишних цифр для стабильности
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Ты — AlexBot, ассистент на сайте Алексея Овсиенко. Алексей — школьник и разработчик (Minecraft сервер Tesseract, игра Палач Online). Ты помогаешь с конспектами ЕГЭ по информатике. Отвечай кратко и дружелюбно."
    });

    // 5. Генерация ответа
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const botResponse = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: botResponse }),
    };

  } catch (error) {
    console.error("Ошибка функции Gemini:", error);

    // Если Google вернул 404 или другую ошибку API
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        text: "ИИ временно недоступен. Ошибка: " + (error.message || "Неизвестная ошибка") 
      }),
    };
  }
};
