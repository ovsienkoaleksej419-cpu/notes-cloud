export async function handler(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API_KEY_MISSING");

    const { prompt } = JSON.parse(event.body);

    // Используем v1beta и правильный формат полей (system_instruction)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        system_instruction: {
          parts: [{
            text: "Ты — AlexBot, ассистент на сайте Алексея Овсиенко. Твоя задача: помогать с конспектами ЕГЭ по информатике и отвечать на вопросы о проектах Алексея (Tesseract, Палач Online). Отвечай кратко и только на русском языке."
          }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API Error:", data);
      throw new Error(data.error?.message || "Ошибка API");
    }

    const botAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Извини, я не смог придумать ответ.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: botAnswer })
    };

  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        text: "Ошибка: " + err.message
      })
    };
  }
}

