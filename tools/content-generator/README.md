# Content Generator

This tool creates draft vocabulary and quiz content from real financial-report or audit text.

It is intentionally local and human-reviewed:

1. Put source text files in `materials/`.
2. Generate a draft bundle into `src/content/generated/`.
3. Preview the generated unit in the app.
4. Review the draft JSON.
5. Merge only approved content into the live app JSON files.

## Generate A Draft

```powershell
npm.cmd run content:generate -- --file materials/apple-2024-10k.txt --unit "Apple 10-K Vocabulary" --words 30 --questionsPerWord 3
```

Generation also refreshes `src/content/generated/index.json`. The quiz app imports that index, so generated draft units appear in the app after generation.

Useful options:

- `--file`: Source `.txt` or `.md` file, relative to the project root.
- `--unit`: Unit title for the generated draft.
- `--category`: Default app category for generated words.
- `--difficulty`: Default difficulty for generated words.
- `--words`: Maximum number of new words.
- `--questionsPerWord`: Number of questions per word, from 1 to 4.
- `--output`: Optional draft filename under `src/content/generated`.

## Refresh Draft Preview Index

If you add, remove, or rename draft files manually, rebuild the generated index:

```powershell
npm.cmd run content:index
```

The app reads:

```text
src/content/generated/index.json
```

Drafts in that index are exposed as normal units/questions in the quiz app. If a draft has already been merged into approved content, the app skips that draft to avoid duplicate ids.

## Merge A Reviewed Draft

```powershell
npm.cmd run content:merge -- src/content/generated/unit-apple-10-k-vocabulary.draft.json
```

The merge script validates ids and references before updating:

- `src/content/vocab-words.json`
- `src/content/units.json`
- `src/content/questions.json`

## Improve Extraction

The starter term bank lives in `domainTerms.mjs`. Add finance, accounting, and audit terms there to improve the generator's recall and question quality.
