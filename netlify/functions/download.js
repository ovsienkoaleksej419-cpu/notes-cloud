import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    const path = event.queryStringParameters?.path;
    if (!path) throw new Error("Path not provided");

    const store = getStore("files");
    const blob = await store.get(path, { type: "arrayBuffer" });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${path.split("/").pop()}"`
      },
      body: Buffer.from(blob).toString("base64"),
      isBase64Encoded: true
    };
  } catch (e) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: e.message })
    };
  }
}
