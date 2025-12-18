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

    // Используем v1beta и твой новый ключ
    const url = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey};

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
        statusCode: response.status,
        headers,
        body: JSON.stringify({ text: "Ошибка API: " + (data.error?.message || "Неизвестно") })
      };
    }

    // Извлекаем текст. Это самая важная часть!
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Модель не прислала текст.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: resultText }) // Поле должно называться 'text'
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ text: "Ошибка сервера: " + error.message })
    };
  }
};
