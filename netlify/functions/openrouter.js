exports.handler = async (event) => {
  try {
    const { prompt, mode } = JSON.parse(event.body || '{}');

    if (!prompt) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: "Пустой запрос" })
      };
    }

    const systemPrompts = {
      ege: `
Ты — преподаватель ЕГЭ.
Объясняй строго по уровню экзамена.

Требования:
• пошаговое решение
• формулы и логика
• без лишней воды
• как на реальном ЕГЭ

Если это задание — решай полностью и давай итоговый ответ.
`,
      free: `
Ты дружелюбный ассистент.
Объясняй просто и кратко.
`
    };

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": Bearer ${process.env.OPENROUTER_API_KEY},
          "Content-Type": "application/json",
          "HTTP-Referer": "https://alexberlin7.netlify.app",
          "X-Title": "AlexBot"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content: systemPrompts[mode] || systemPrompts.ege
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "Нет ответа"
      })
    };

  } catch (e) {
    console.error("Ошибка функции:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Ошибка сервера" })
    };
  }
};
