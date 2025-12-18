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
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) throw new Error("API ключ не найден в настройках Netlify");
    if (!prompt) return { statusCode: 200, headers, body: JSON.stringify({ reply: "Ты ничего не написал 🙂" }) };

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${apiKey},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Ты — AlexBot. Помогаешь с конспектами ЕГЭ. Отвечай кратко." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: "Ошибка API: " + (data.error?.message || "нет доступа") })
      };
    }

    const text = data.choices?.[0]?.message?.content || "Бот промолчал 🤷";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: text })
    };

  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: "Ошибка функции: " + error.message })
    };
  }
};
