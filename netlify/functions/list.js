import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    const store = getStore("files");

    const subject = event.queryStringParameters?.subject || "";
    const prefix = subject ? ${subject}/ : "";

    const items = await store.list({ prefix });

    const files = items.blobs.map(b => ({
      name: b.key.split("/").pop(),
      path: b.key
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(files) // ✅ ВАЖНО
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: err.message })
    };
  }
}
