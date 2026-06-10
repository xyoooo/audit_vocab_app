import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildGeneratedIndex } from "./indexGeneratedDrafts.mjs";
import { domainTerms } from "./domainTerms.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const approvedContentDir = path.join(rootDir, "src/content");
const generatedDir = path.join(approvedContentDir, "generated");

const categories = new Set([
  "Business English Core",
  "Accounting Basics",
  "Audit Basics",
  "Advanced Audit / Assurance",
  "CFA / Finance Basics",
  "Market Vocabulary"
]);

const difficulties = new Set(["Beginner", "Intermediate", "Advanced"]);
const questionTypes = ["meaning-mcq", "context-mcq", "reverse-mcq", "similar-distinction"];

main();

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.file || !args.unit) {
    printUsage();
    process.exit(1);
  }

  const sourcePath = path.resolve(rootDir, args.file);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  const requestedWordCount = Number(args.words ?? 30);
  const questionsPerWord = Number(args.questionsPerWord ?? 3);
  const fallbackCategory = normalizeChoice(args.category, categories, "Business English Core");
  const fallbackDifficulty = normalizeChoice(args.difficulty, difficulties, "Intermediate");
  const sourceText = cleanText(fs.readFileSync(sourcePath, "utf8"));

  const approved = loadApprovedContent();
  const reservedWordIds = new Set(approved.wordIds);
  const reservedUnitIds = new Set(approved.unitIds);
  const reservedQuestionIds = new Set(approved.questionIds);
  const selectedTerms = findTerms(sourceText, requestedWordCount, approved.wordIds);

  if (!selectedTerms.length) {
    throw new Error("No known finance/audit terms were found in the source file. Add terms to tools/content-generator/domainTerms.mjs or try another report.");
  }

  const unitId = uniqueId(`unit-${slugify(args.unit)}`, reservedUnitIds);
  const vocabWords = selectedTerms.map(({ term }) =>
    buildVocabWord(term, sourceText, fallbackCategory, fallbackDifficulty, reservedWordIds)
  );
  const localWordIds = new Set(vocabWords.map((word) => word.id));
  const questions = vocabWords.flatMap((word) =>
    buildQuestions(word, vocabWords, unitId, Math.max(1, Math.min(questionsPerWord, questionTypes.length)), reservedQuestionIds)
  );

  const draft = {
    source: {
      type: args.sourceType ?? "text-file",
      title: args.sourceTitle ?? path.basename(sourcePath),
      path: path.relative(rootDir, sourcePath).replaceAll("\\", "/"),
      generatedAt: new Date().toISOString()
    },
    unit: {
      id: unitId,
      title: args.unit,
      category: fallbackCategory,
      difficulty: fallbackDifficulty,
      orderIndex: nextOrderIndex(approved.units),
      wordIds: vocabWords.map((word) => word.id)
    },
    vocabWords,
    questions
  };

  validateDraft(draft, approved, localWordIds);

  fs.mkdirSync(generatedDir, { recursive: true });
  const outputName = args.output ?? `${draft.unit.id}.draft.json`;
  const outputPath = path.join(generatedDir, outputName);
  fs.writeFileSync(outputPath, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
  buildGeneratedIndex(generatedDir);

  console.log(`Generated ${vocabWords.length} words and ${questions.length} questions.`);
  console.log(`Draft written to ${path.relative(rootDir, outputPath)}`);
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) continue;

    const [rawKey, rawValue] = item.slice(2).split("=");
    const key = rawKey.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    parsed[key] = rawValue ?? argv[index + 1];

    if (rawValue === undefined) {
      index += 1;
    }
  }
  return parsed;
}

function printUsage() {
  console.log(`
Usage:
  npm run content:generate -- --file materials/apple-2024-10k.txt --unit "Apple 10-K Vocabulary"

Options:
  --file              Source .txt/.md file, relative to the project root.
  --unit              Unit title for the generated draft.
  --category          Default category if a term does not define one.
  --difficulty        Default difficulty if a term does not define one.
  --words             Maximum number of new words to generate. Default: 30.
  --questionsPerWord  Number of questions per word, 1-4. Default: 3.
  --output            Optional draft filename under src/content/generated.
`);
}

function loadApprovedContent() {
  const vocabWords = readJson(path.join(approvedContentDir, "vocab-words.json"), []);
  const units = readJson(path.join(approvedContentDir, "units.json"), []);
  const questions = readJson(path.join(approvedContentDir, "questions.json"), []);

  return {
    vocabWords,
    units,
    questions,
    wordIds: new Set(vocabWords.map((word) => word.id)),
    unitIds: new Set(units.map((unit) => unit.id)),
    questionIds: new Set(questions.map((question) => question.id))
  };
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function cleanText(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function findTerms(text, limit, existingWordIds) {
  const lowerText = text.toLowerCase();

  return domainTerms
    .map((term) => ({
      term,
      count: countOccurrences(lowerText, term.term.toLowerCase())
    }))
    .filter(({ term, count }) => count > 0 && !existingWordIds.has(slugify(term.term)))
    .sort((a, b) => b.count - a.count || a.term.term.localeCompare(b.term.term))
    .slice(0, limit);
}

function countOccurrences(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return Array.from(text.matchAll(new RegExp(`\\b${escaped}\\b`, "gi"))).length;
}

function buildVocabWord(term, sourceText, fallbackCategory, fallbackDifficulty, existingWordIds) {
  const id = uniqueId(slugify(term.term), existingWordIds);
  return {
    id,
    word: term.term,
    chineseMeaning: term.chineseMeaning,
    englishDefinition: term.definition,
    category: normalizeChoice(term.category, categories, fallbackCategory),
    difficulty: normalizeChoice(term.difficulty, difficulties, fallbackDifficulty),
    exampleSentence: findExampleSentence(sourceText, term.term) ?? `The report discusses ${term.term} as part of financial performance and risk analysis.`,
    relatedWords: term.relatedWords,
    commonMistake: term.commonMistake
  };
}

function findExampleSentence(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`[^.!?]{0,180}\\b${escaped}\\b[^.!?]{0,180}[.!?]`, "i");
  const match = text.match(pattern);
  if (!match) return undefined;

  const sentence = match[0].replace(/\s+/g, " ").trim();
  if (sentence.length < 30) return undefined;
  return sentence.length > 260 ? `${sentence.slice(0, 257).trim()}...` : sentence;
}

function buildQuestions(word, allWords, unitId, questionsPerWord, existingQuestionIds) {
  const selectedTypes = questionTypes.slice(0, questionsPerWord);
  return selectedTypes.map((questionType, index) => {
    const baseId = `q-${slugify(unitId.replace(/^unit-/, ""))}-${slugify(word.word)}-${index + 1}`;
    const id = uniqueId(baseId, existingQuestionIds);
    const distractors = pickDistractors(word, allWords, 3);

    if (questionType === "meaning-mcq") {
      return {
        id,
        unitId,
        vocabWordId: word.id,
        questionType,
        questionText: `What does "${word.word}" mean?`,
        options: shuffle([word.englishDefinition, ...distractors.map((item) => item.englishDefinition)]),
        correctAnswer: word.englishDefinition,
        explanation: `${word.word} means ${lowercaseFirst(word.englishDefinition)}`
      };
    }

    if (questionType === "context-mcq") {
      return {
        id,
        unitId,
        vocabWordId: word.id,
        questionType,
        questionText: buildContextQuestion(word),
        options: shuffle([word.word, ...distractors.map((item) => item.word)]),
        correctAnswer: word.word,
        explanation: `The sentence describes ${word.word}: ${word.englishDefinition}`
      };
    }

    if (questionType === "reverse-mcq") {
      return {
        id,
        unitId,
        vocabWordId: word.id,
        questionType,
        questionText: `Which term means: ${lowercaseFirst(word.englishDefinition)}`,
        options: shuffle([word.word, ...distractors.map((item) => item.word)]),
        correctAnswer: word.word,
        explanation: `${word.word} is the term that matches this definition.`
      };
    }

    return {
      id,
      unitId,
      vocabWordId: word.id,
      questionType,
      questionText: `Which term is most closely related to "${word.relatedWords[0] ?? word.word}" in financial-report language?`,
      options: shuffle([word.word, ...distractors.map((item) => item.word)]),
      correctAnswer: word.word,
      explanation: `${word.word} is related to ${word.relatedWords.join(", ")}.`
    };
  });
}

function buildContextQuestion(word) {
  const sentence = word.exampleSentence.replace(new RegExp(`\\b${escapeRegExp(word.word)}\\b`, "i"), "______");
  if (sentence.includes("______")) return sentence;
  return `The report refers to ${word.englishDefinition.toLowerCase()} as ______.`;
}

function pickDistractors(word, allWords, count) {
  const pool = allWords.filter((item) => item.id !== word.id);
  const sameCategory = pool.filter((item) => item.category === word.category);
  return [...sameCategory, ...pool]
    .filter((item, index, array) => array.findIndex((candidate) => candidate.id === item.id) === index)
    .slice(0, count);
}

function validateDraft(draft, approved, localWordIds) {
  if (approved.unitIds.has(draft.unit.id)) {
    throw new Error(`Generated unit id already exists: ${draft.unit.id}`);
  }

  for (const word of draft.vocabWords) {
    if (approved.wordIds.has(word.id)) {
      throw new Error(`Generated word id already exists: ${word.id}`);
    }
  }

  for (const question of draft.questions) {
    if (approved.questionIds.has(question.id)) {
      throw new Error(`Generated question id already exists: ${question.id}`);
    }

    if (question.unitId !== draft.unit.id) {
      throw new Error(`Question "${question.id}" references the wrong unit.`);
    }

    if (!localWordIds.has(question.vocabWordId)) {
      throw new Error(`Question "${question.id}" references a missing generated word.`);
    }

    if (!question.options.includes(question.correctAnswer)) {
      throw new Error(`Question "${question.id}" does not include its correct answer in options.`);
    }
  }
}

function nextOrderIndex(units) {
  return Math.max(0, ...units.map((unit) => Number(unit.orderIndex) || 0)) + 1;
}

function uniqueId(base, existingIds) {
  let id = base;
  let index = 2;
  while (existingIds.has(id)) {
    id = `${base}-${index}`;
    index += 1;
  }
  existingIds.add(id);
  return id;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeChoice(value, allowed, fallback) {
  return allowed.has(value) ? value : fallback;
}

function shuffle(items) {
  return [...items].sort((a, b) => stableHash(a) - stableHash(b));
}

function stableHash(value) {
  return Array.from(value).reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 997, 7);
}

function lowercaseFirst(value) {
  return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
