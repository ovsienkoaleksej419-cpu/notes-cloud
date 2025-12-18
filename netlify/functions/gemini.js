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

    // Используем v1, она самая стабильная
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Переносим инструкцию прямо в prompt, чтобы API не ругалось на неизвестные поля
    const instruction = "Ты — AlexBot, ассистент Алексея. Помогаешь с конспектами ЕГЭ. Отвечай кратко. Вопрос пользователя: ";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: instruction + prompt }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Ошибка API");
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

