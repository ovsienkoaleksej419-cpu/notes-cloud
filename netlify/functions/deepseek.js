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
    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: "Ты ничего не написал 🙂" })
      };
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) throw new Error("DEEPSEEK_API_KEY не задан");

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${apiKey},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "Ты — AlexBot. Помогаешь с конспектами ЕГЭ. Отвечай кратко и по делу."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();

    // 👇 ЛОГ ДЛЯ NETLIFY (очень важно)
    console.log("DeepSeek raw response:", JSON.stringify(data));

    if (!response.ok  !data.choices  !data.choices.length) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          reply: "DeepSeek не вернул ответ. Проверь лимиты или API-ключ."
        })
      };
    }

    const text = data.choices[0].message?.content;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: text || "Ответ пустой 🤷"
      })
    };

  } catch (error) {
    console.error("Ошибка DeepSeek:", error);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: "Ошибка бота: " + error.message
      })
    };
  }
}
