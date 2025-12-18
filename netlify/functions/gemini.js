exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const body = JSON.parse(event.body);
    const prompt = body.prompt || "Привет";

    // ИСПРАВЛЕННЫЙ URL (v1 вместо v1beta)
    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + apiKey;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: "Ошибка Google: " + (data.error?.message || "неизвестно") })
      };
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Бот промолчал";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: resultText })
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: "Ошибка сервера: " + error.message })
    };
  }
};
