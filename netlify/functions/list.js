import { getStore } from "@netlify/blobs";

export async function handler() {
  try {
    const store = getStore("files");
    const items = await store.list();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items.blobs || [])
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: e.message })
    };
  }
}

