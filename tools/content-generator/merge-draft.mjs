import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const contentDir = path.join(rootDir, "src/content");

main();

function main() {
  const draftArg = process.argv[2];
  if (!draftArg) {
    console.log("Usage: npm run content:merge -- src/content/generated/my-unit.draft.json");
    process.exit(1);
  }

  const draftPath = path.resolve(rootDir, draftArg);
  if (!fs.existsSync(draftPath)) {
    throw new Error(`Draft file not found: ${draftPath}`);
  }

  const draft = JSON.parse(fs.readFileSync(draftPath, "utf8"));
  const vocabPath = path.join(contentDir, "vocab-words.json");
  const unitsPath = path.join(contentDir, "units.json");
  const questionsPath = path.join(contentDir, "questions.json");

  const vocabWords = readJson(vocabPath);
  const units = readJson(unitsPath);
  const questions = readJson(questionsPath);

  validateDraftForMerge(draft, vocabWords, units, questions);

  writeJson(vocabPath, [...vocabWords, ...draft.vocabWords]);
  writeJson(unitsPath, [...units, draft.unit].sort((a, b) => a.orderIndex - b.orderIndex));
  writeJson(questionsPath, [...questions, ...draft.questions]);

  console.log(`Merged ${draft.vocabWords.length} words and ${draft.questions.length} questions from ${path.relative(rootDir, draftPath)}.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function validateDraftForMerge(draft, vocabWords, units, questions) {
  const wordIds = new Set(vocabWords.map((word) => word.id));
  const unitIds = new Set(units.map((unit) => unit.id));
  const questionIds = new Set(questions.map((question) => question.id));
  const draftWordIds = new Set(draft.vocabWords.map((word) => word.id));

  if (!draft.unit?.id) {
    throw new Error("Draft is missing unit.id.");
  }

  if (unitIds.has(draft.unit.id)) {
    throw new Error(`Unit already exists: ${draft.unit.id}`);
  }

  for (const word of draft.vocabWords) {
    if (wordIds.has(word.id)) {
      throw new Error(`Word already exists: ${word.id}`);
    }
  }

  for (const wordId of draft.unit.wordIds) {
    if (!draftWordIds.has(wordId)) {
      throw new Error(`Draft unit references a missing generated word: ${wordId}`);
    }
  }

  for (const question of draft.questions) {
    if (questionIds.has(question.id)) {
      throw new Error(`Question already exists: ${question.id}`);
    }

    if (question.unitId !== draft.unit.id) {
      throw new Error(`Question "${question.id}" references a different unit.`);
    }

    if (!draftWordIds.has(question.vocabWordId)) {
      throw new Error(`Question "${question.id}" references a missing generated word.`);
    }

    if (!question.options.includes(question.correctAnswer)) {
      throw new Error(`Question "${question.id}" does not include its correct answer in options.`);
    }
  }
}
