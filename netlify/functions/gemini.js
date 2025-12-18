exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  // Обработка предзапроса (CORS)
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API_KEY_MISSING: Проверьте переменные в Netlify");

    const { prompt } = JSON.parse(event.body);

    // Используем v1beta — это решит проблему с 404
    const url = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey};

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: "Ты — AlexBot, ассистент по конспектам. Отвечай кратко и по делу. Вопрос: " + prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Выводим детальную ошибку от Google, если она будет
      throw new Error(data.error?.message || JSON.stringify(data));
    }

    const botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "Извини, я не смог сформулировать ответ.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: botMessage })
    };

  } catch (error) {
    console.error("Gemini Error:", error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        text: "Ошибка: " + error.message
      })
    };
  }
};
