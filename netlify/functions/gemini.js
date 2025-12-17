const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Проверка наличия ключа
    if (!process.env.GEMINI_API_KEY) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ text: "Ошибка: API ключ не найден в настройках Netlify!" }) 
      };
    }

    const { prompt } = JSON.parse(event.body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Ты — AlexBot, ассистент на сайте Алексея Овсиенко. Отвечай кратко."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Произошла ошибка в работе ИИ: " + error.message })
    };
  }
};
