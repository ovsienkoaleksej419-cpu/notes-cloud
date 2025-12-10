// netlify/functions/delete.js

// *** ИСПРАВЛЕНИЕ ОШИБКИ ИМПОРТА: Замена 'import' на 'require' ***
const { blobs } = require("@netlify/blobs");

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
    
    const body = JSON.parse(event.body || "{}");
    const { path, password } = body;

    const MASTER = process.env.MASTER_PASSWORD || "1234";
    if (password !== MASTER) {
      return { statusCode: 403, body: JSON.stringify({ status: "wrong_password" }) };
    }
    if (!path) return { statusCode: 400, body: JSON.stringify({ status: "bad_request" }) };

    // Инициализация storage теперь будет работать корректно
    const storage = blobs({ token: process.env.NETLIFY_BLOBS_TOKEN });
    
    await storage.delete(path);

    return { statusCode: 200, body: JSON.stringify({ status: "deleted", path }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ status: "error", message: String(err) }) };
  }
};
