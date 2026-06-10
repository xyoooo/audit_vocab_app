# Vocabulary Content

The app loads vocabulary content from these JSON files:

- `vocab-words.json`: word definitions, examples, related words, and common mistakes.
- `units.json`: lesson groupings and the word ids included in each unit.
- `questions.json`: quiz questions, answer options, correct answers, and explanations.
- `generated/index.json`: generated draft bundles that should be previewed in the app.

When adding content:

1. Add the vocabulary entries to `vocab-words.json`.
2. Add or update a unit in `units.json` and include the new word ids.
3. Add quiz questions to `questions.json`.

The loader in `src/lib/data.ts` validates that each unit references existing words, each question references an existing unit and word, and every correct answer appears in the question options.

Generated draft files are created under `generated/`. Run `npm.cmd run content:index` after manually changing draft files so the app can preview them.
