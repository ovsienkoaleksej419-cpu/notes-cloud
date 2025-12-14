import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    const path = event.queryStringParameters?.path;
    const store = getStore("files");
    const blob = await store.get(path, { type: "arrayBuffer" });

    return {
      statusCode: 200,
      body: Buffer.from(blob).toString("base64"),
      isBase64Encoded: true
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: e.message })
    };
  }
}
