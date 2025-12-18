exports.handler = async (event) => {
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
          ]
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Нет ответа от модели.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text })
    };

  } catch (error) {
    console.error("Gemini error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        text: "Ошибка бота: " + error.message
      })
    };
  }
};
