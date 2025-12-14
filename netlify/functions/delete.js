import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    if (!event.body) throw new Error("Empty body");

    const { path } = JSON.parse(event.body);
    if (!path) throw new Error("Path not provided");

    const store = getStore("files");
    await store.delete(path);

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
