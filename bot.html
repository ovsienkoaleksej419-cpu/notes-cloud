exports.handler = async (event) => {
  try {
    const { prompt, mode } = JSON.parse(event.body || '{}');

    const systemPrompts = {
      ege: `
Ты — преподаватель ЕГЭ.
Объясняй строго по уровню экзамена.
Ответ:
• пошагово
• с формулами
• без лишней воды
• как в реальном задании ЕГЭ
Если это задание — решай полностью и давай ответ.
`,
      free: `
Ты дружелюбный ассистент.
Объясняй просто и кратко.
`
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${process.env.OPENROUTER_API_KEY},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: systemPrompts[mode] || systemPrompts.ege },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "Нет ответа"
      })
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Ошибка сервера" })
    };
  }
};
