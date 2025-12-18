const fetch = require('node-fetch');
exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
  try {
    const body = JSON.parse(event.body);
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: body.prompt }] }] })
    });
    const data = await response.json();
    return { statusCode: 200, headers, body: JSON.stringify({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "Ошибка API" }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ reply: "Ошибка: " + e.message }) };
  }
};

