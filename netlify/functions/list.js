import { getStore } from "@netlify/blobs";

export async function handler(event, context) {
  try {
    const store = getStore();
    const subject = event.queryStringParameters?.subject || "";

    const prefix = subject ? `${subject}/` : "";
    const items = await store.list({ prefix });

    const files = items.blobs.map((b) => ({
      name: b.key.split("/").pop(),
      path: b.key,
      size: b.size,
      lastModified: b.updatedAt
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "ok", files })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(e) })
    };
  }
}

