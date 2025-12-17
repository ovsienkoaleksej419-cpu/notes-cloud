const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { prompt } = JSON.parse(event.body);

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // МЕНЯЕМ МОДЕЛЬ НА PRO ВЕРСИЮ (иногда она доступна быстрее на новых ключах)
    // Либо оставляем flash, но с явным указанием версии
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro" 
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: response.text() }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 200, // Возвращаем 200, чтобы фронтенд вывел текст ошибки красиво
      headers,
      body: JSON.stringify({ 
        text: "Бот активируется. Попробуй еще раз через 5-10 минут. Ошибка: " + error.message 
      }),
    };
  }
};
