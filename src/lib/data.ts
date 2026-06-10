import generatedDraftsData from "@/content/generated/index.json";
import questionsData from "@/content/questions.json";
import unitsData from "@/content/units.json";
import vocabWordsData from "@/content/vocab-words.json";
import type { Question, Unit, VocabWord } from "./types";

interface GeneratedContentDraft {
  unit: Unit;
  vocabWords: VocabWord[];
  questions: Question[];
}

const approvedVocabWords = vocabWordsData as VocabWord[];
const approvedUnits = unitsData as Unit[];
const approvedQuestions = questionsData as Question[];
const generatedContent = collectGeneratedContent(generatedDraftsData as GeneratedContentDraft[]);

export const vocabWords = [...approvedVocabWords, ...generatedContent.vocabWords];
export const units = [...approvedUnits, ...generatedContent.units].sort((a, b) => a.orderIndex - b.orderIndex);
export const questions = [...approvedQuestions, ...generatedContent.questions];

export const questionTypeLabels: Record<Question["questionType"], string> = {
  "meaning-mcq": "Meaning MCQ",
  "context-mcq": "Context MCQ",
  "reverse-mcq": "Reverse MCQ",
  "similar-distinction": "Similar-word Distinction"
};

export function getUnit(unitId: string) {
  return units.find((unitItem) => unitItem.id === unitId);
}

export function getWord(wordId: string) {
  return vocabWords.find((item) => item.id === wordId);
}

export function getQuestionsForUnit(unitId: string) {
  return questions.filter((question) => question.unitId === unitId);
}

validateContent();

function validateContent() {
  const wordIds = new Set(vocabWords.map((word) => word.id));
  const unitIds = new Set(units.map((unit) => unit.id));

  assertUnique("vocabulary word", vocabWords.map((word) => word.id));
  assertUnique("unit", units.map((unit) => unit.id));
  assertUnique("question", questions.map((question) => question.id));

  for (const unit of units) {
    for (const wordId of unit.wordIds) {
      if (!wordIds.has(wordId)) {
        throw new Error(`Unit "${unit.id}" references missing vocabulary word "${wordId}".`);
      }
    }
  }

  for (const question of questions) {
    if (!unitIds.has(question.unitId)) {
      throw new Error(`Question "${question.id}" references missing unit "${question.unitId}".`);
    }

    if (!wordIds.has(question.vocabWordId)) {
      throw new Error(`Question "${question.id}" references missing vocabulary word "${question.vocabWordId}".`);
    }

    if (!question.options.includes(question.correctAnswer)) {
      throw new Error(`Question "${question.id}" has a correct answer that is not listed as an option.`);
    }
  }
}

function collectGeneratedContent(drafts: GeneratedContentDraft[]) {
  const approvedWordIds = new Set(approvedVocabWords.map((word) => word.id));
  const approvedUnitIds = new Set(approvedUnits.map((unit) => unit.id));
  const approvedQuestionIds = new Set(approvedQuestions.map((question) => question.id));
  const result = {
    vocabWords: [] as VocabWord[],
    units: [] as Unit[],
    questions: [] as Question[]
  };

  for (const draft of drafts) {
    if (
      approvedUnitIds.has(draft.unit.id) ||
      draft.vocabWords.some((word) => approvedWordIds.has(word.id)) ||
      draft.questions.some((question) => approvedQuestionIds.has(question.id))
    ) {
      continue;
    }

    result.units.push(draft.unit);
    result.vocabWords.push(...draft.vocabWords);
    result.questions.push(...draft.questions);
  }

  return result;
}

function assertUnique(label: string, ids: string[]) {
  const seen = new Set<string>();

  for (const id of ids) {
    if (seen.has(id)) {
      throw new Error(`Duplicate ${label} id found: "${id}".`);
    }

    seen.add(id);
  }
}
