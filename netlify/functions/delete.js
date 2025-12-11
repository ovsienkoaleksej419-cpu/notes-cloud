import { getStore } from "@netlify/blobs";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { path, password } = JSON.parse(event.body);

    if (password !== process.env.MASTER_PASSWORD) {
      return { statusCode: 403, body: JSON.stringify({ status: "wrong_password" }) };
    }

    const store = getStore();

    await store.delete(path);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "deleted" })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(e) })
    };
  }
}
