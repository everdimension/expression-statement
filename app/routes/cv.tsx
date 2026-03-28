import fs from "node:fs";
import path from "node:path";

export function loader() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "public", "cv.html"),
    "utf-8"
  );
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
