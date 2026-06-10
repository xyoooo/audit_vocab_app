import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildGeneratedIndex } from "./indexGeneratedDrafts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const generatedDir = path.join(rootDir, "src/content/generated");

const result = buildGeneratedIndex(generatedDir);
console.log(`Indexed ${result.count} generated draft${result.count === 1 ? "" : "s"} in ${path.relative(rootDir, result.indexPath)}.`);
