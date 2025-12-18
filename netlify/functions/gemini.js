export async function handler(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API_KEY_MISSING");

    const { prompt } = JSON.parse(event.body);

    // Используем САМУЮ СТАБИЛЬНУЮ модель, которая есть у всех
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ 
            text: "Ты — AlexBot, ассистент Алексея. Отвечай кратко. Вопрос: " + prompt 
          }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Если даже gemini-pro выдает 404, значит ключ еще не прошел активацию
      throw new Error(data.error?.message || "Google еще не активировал ваш проект.");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        text: data.candidates[0].content.parts[0].text 
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ text: "Ошибка: " + err.message })
    };
  }
}

