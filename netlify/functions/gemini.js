const fetch = require('node-fetch');

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

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Ты AlexBot. Ответь кратко: " + prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({ reply: "Ошибка API: " + (data.error?.message || "Неизвестно") })
        };
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Нет ответа от API";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: resultText })
    };
  } catch (error) {
    return {
      statusCode: 500, // Была запятая, теперь число 500
      headers,
      body: JSON.stringify({ reply: "Ошибка сервера: " + error.message })
    };
  }
};
