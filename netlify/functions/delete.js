import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    const { path } = JSON.parse(event.body || "{}");
    const store = getStore("files");

    await store.delete(path);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: e.message })
    };
  }
}
