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

    // ВАЖНО: Используем 1.5-flash и версию v1beta
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ 
            text: "Ты — AlexBot, ассистент на сайте Алексея. Помогаешь с конспектами ЕГЭ по информатике. Отвечай кратко. Вопрос: " + prompt 
          }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API Error:", data);
      throw new Error(data.error?.message || "Ошибка модели");
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


