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

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("OPENROUTER_API_KEY не задан");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://alexberlin6.netlify.app",
        "X-Title": "AlexBot"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Ты — AlexBot, помощник сайта с конспектами ЕГЭ. Отвечай кратко, понятно и по делу."
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
    console.log("OpenRouter response:", JSON.stringify(data));

    if (!response.ok || !data.choices?.length) {
      throw new Error(data.error?.message || "Пустой ответ от OpenRouter");
    }

    const text = data.choices[0].message?.content;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: text || "Ответ пустой 🤷" })
    };

  } catch (error) {
    console.error("OpenRouter error:", error);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: "Ошибка бота: " + error.message })
    };
  }
}
