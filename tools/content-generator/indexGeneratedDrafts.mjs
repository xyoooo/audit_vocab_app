import fs from "node:fs";
import path from "node:path";

export function buildGeneratedIndex(generatedDir) {
  fs.mkdirSync(generatedDir, { recursive: true });

  const drafts = fs
    .readdirSync(generatedDir)
    .filter((fileName) => fileName.endsWith(".draft.json"))
    .sort()
    .map((fileName) => {
      const filePath = path.join(generatedDir, fileName);
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    });

  const indexPath = path.join(generatedDir, "index.json");
  fs.writeFileSync(indexPath, `${JSON.stringify(drafts, null, 2)}\n`, "utf8");

  return { count: drafts.length, indexPath };
}
