const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API_KEY_MISSING");

    const { prompt } = JSON.parse(event.body);

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro",
      systemInstruction:
        "Ты — AlexBot, помощник сайта с конспектами ЕГЭ. Отвечай кратко, понятно и по делу."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: response.text() })
    };

  } catch (error) {
    console.error("Ошибка функции:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        text: "Ошибка бота: " + error.message
      })
    };
  }
};
