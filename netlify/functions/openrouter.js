export async function handler(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  try {
    const { prompt, mode } = JSON.parse(event.body || "{}");

    if (!prompt) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: "Пустой запрос" }),
      };
    }

    const systemPrompts = {
      ege: `
Ты — преподаватель ЕГЭ по информатике.
Объясняй строго по формату экзамена.
• пошагово
• с формулами
• без воды
• если задача — решай полностью
• в конце давай ОТВЕТ
`,
      free: `
Ты дружелюбный помощник.
Объясняй просто и понятно.
`,
    };

    console.log("=== BOT REQUEST ===");
    console.log("MODE:", mode || "ege");
    console.log("PROMPT:", prompt);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://alexberlin10.netlify.app",
          "X-Title": "AlexBot",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content: systemPrompts[mode] || systemPrompts.ege,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      "Нет ответа от модели";

    console.log("REPLY:", reply);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
  } catch (e) {
    console.error("BOT ERROR:", e);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ reply: "Ошибка сервера" }),
    };
  }
}
