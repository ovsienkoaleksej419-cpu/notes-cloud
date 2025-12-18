exports.handler = async (event) => {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json" 
  };

  // Обработка предварительного запроса браузера (CORS)
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Используем встроенный fetch (без require)
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ parts: [{ text: body.prompt || "Привет" }] }] 
      })
    });

    const data = await response.json();
    
    // Проверка на ошибки от самого Google
    if (!response.ok) {
      return { 
        statusCode: 200, 
        headers, 
        body: JSON.stringify({ reply: "Ошибка Google API: " + (data.error?.message || "нет доступа") }) 
      };
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Бот прислал пустой ответ";

    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ reply: resultText }) 
    };

  } catch (e) {
    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ reply: "Ошибка функции: " + e.message }) 
    };
  }
};
