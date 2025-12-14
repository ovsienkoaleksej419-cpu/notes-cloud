import { getStore } from "@netlify/blobs";

export async function handler(event) {
  const path = event.queryStringParameters?.path;
  if (!path) {
    return { statusCode: 400, body: "No file" };
  }

  const store = getStore("files");
  const blob = await store.get(path, { type: "arrayBuffer" });

  if (!blob) {
    return { statusCode: 404, body: "Not found" };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=\"${path.split('/').pop()}\"`
    },
    body: Buffer.from(blob).toString("base64"),
    isBase64Encoded: true
  };
}

