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
    if (!apiKey) throw new Error("API KEY NOT FOUND");

    const { prompt } = JSON.parse(event.body || "{}");

    const url =
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=" +
      apiKey;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt || "Привет" }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          reply: "Ошибка Google: " + (data.error?.message || "неизвестно")
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Ответ пустой"
      })
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: "Ошибка функции: " + e.message })
    };
  }
};
