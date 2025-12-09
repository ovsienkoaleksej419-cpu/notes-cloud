// netlify/functions/upload.js
import { blobs } from "@netlify/blobs";

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

    // parse JSON body (client sends JSON)
    const body = JSON.parse(event.body || "{}");
    const { subject, filename, dataUrl, password } = body;

    const MASTER = process.env.MASTER_PASSWORD || "1234";
    if (password !== MASTER) {
      return { statusCode: 403, body: JSON.stringify({ status: "wrong_password" }) };
    }
    if (!subject || !filename || !dataUrl) {
      return { statusCode: 400, body: JSON.stringify({ status: "bad_request" }) };
    }

    // extract base64 part
    const commaIndex = dataUrl.indexOf(",");
    const base64 = commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl;
    const buffer = Buffer.from(base64, "base64");

    // init storage
    const storage = blobs({ token: process.env.NETLIFY_BLOBS_TOKEN });

    const path = `${subject}/${filename}`;

    await storage.set(path, buffer);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", path })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ status: "error", message: String(err) }) };
  }
};
