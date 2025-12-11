import { getStore } from "@netlify/blobs";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { subject, filename, dataUrl, password } = JSON.parse(event.body);

    if (password !== process.env.MASTER_PASSWORD) {
      return { statusCode: 403, body: JSON.stringify({ status: "wrong_password" }) };
    }

    const base64 = dataUrl.split(",")[1];
    const buffer = Buffer.from(base64, "base64");

    const store = getStore("files"); // имя хранилища

    const path = `${subject}/${filename}`;

    await store.set(path, buffer);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", path })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
}
