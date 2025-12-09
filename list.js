// netlify/functions/list.js
import { blobs } from "@netlify/blobs";

exports.handler = async function(event, context) {
  try {
    const storage = blobs({ token: process.env.NETLIFY_BLOBS_TOKEN });

    const subject = (event.queryStringParameters && event.queryStringParameters.subject) || "";
    // list blobs with prefix (subject/)
    // storage.list may return array of keys depending on SDK; using storage.list API
    const prefix = subject ? `${subject}/` : "";

    // The blobs SDK provides list() returns array of { key, size, lastModified } (subject to SDK)
    const items = await storage.list(prefix);

    // Normalize keys to name and path
    const result = (items || []).map(it => {
      // it.key or it.name depending on SDK; try both
      const key = it.key || it.name || it.Id || it.Key || it.path || it;
      // name is after last slash
      const name = key.includes("/") ? key.split("/").pop() : key;
      return {
        name,
        path: key,
        size: it.size || it.byteSize || null,
        lastModified: it.lastModified || it.updatedAt || null
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "ok", files: result })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ status: "error", message: String(err) }) };
  }
};
