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

    // Используем v1beta и модель 1.5-flash
    const url = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey};

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Ты — AlexBot, помощник Алексея. Отвечай кратко на вопрос: " + prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Ошибка Google API");
    }

    // Извлекаем текст правильно
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Извини, не смог придумать ответ.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: resultText }) // Возвращаем объект с полем text
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ text: "Ошибка: " + error.message })
    };
  }
};
