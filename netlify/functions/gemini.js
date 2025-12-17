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

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          systemInstruction: {
            parts: [{
              text: "Ты — AlexBot, ассистент на сайте Алексея. Помогаешь с конспектами ЕГЭ по информатике. Отвечай кратко и понятно."
            }]
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      throw new Error(data.error?.message || "Gemini API error");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        text: data.candidates[0].content.parts[0].text
      })
    };

  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        text: "Ошибка бота: " + err.message
      })
    };
  }
}
