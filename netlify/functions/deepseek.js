exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

  try {
    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt?.trim();
    // В Netlify переименуй переменную или используй эту
    const apiKey = process.env.DEEPSEEK_API_KEY; 

    if (!apiKey) throw new Error("API ключ не найден в Netlify");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${apiKey},
        "HTTP-Referer": "https://alexberlib6.netlify.app", // Твой сайт для OpenRouter
        "X-Title": "AlexBot",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat", // Важно: путь модели в OpenRouter
        "messages": [
          { "role": "user", "content": prompt || "Привет" }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: "OpenRouter Error: " + (data.error?.message || "ошибка запроса") })
      };
    }

    const text = data.choices?.[0]?.message?.content || "Пустой ответ";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: text })
    };

  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: "Ошибка: " + error.message })
    };
  }
};
