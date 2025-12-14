import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    if (!event.body) throw new Error("Empty body");

    const { name, content } = JSON.parse(event.body);
    if (!name || !content) throw new Error("Invalid data");

    const store = getStore("files");
    await store.set(name, content);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: e.message })
    };
  }
}
