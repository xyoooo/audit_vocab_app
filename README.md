# Professional Vocabulary Trainer

A Next.js MVP for learning professional English vocabulary across audit, accounting, CFA-style finance, and market topics. The app uses mock TypeScript data and stores progress in `localStorage`, so it is simple to run locally and deploy on Vercel Hobby.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Mock data in `src/lib/data.ts`
- Browser `localStorage` for progress and wrong-question review

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm run start
```

## App Structure

- `src/app/page.tsx` - Home with suggested unit, review count, and quick actions.
- `src/app/units/page.tsx` - Unit list.
- `src/app/units/[unitId]/page.tsx` - Unit detail and vocabulary cards.
- `src/app/quiz/[unitId]/page.tsx` - One-question-at-a-time quiz session.
- `src/app/result/[attemptId]/page.tsx` - Score, accuracy, type breakdown, and weak words.
- `src/app/wrong-practice/page.tsx` - Due or all active wrong-question review.
- `src/app/progress/page.tsx` - Completed units, accuracy, best/weakest areas, and weak words.
- `src/components/*` - Reusable UI components requested in the MVP brief.
- `src/lib/types.ts` - Data model types.
- `src/lib/storage.ts` - localStorage load/save and attempt recording.
- `src/lib/stats.ts` - Progress and analytics helpers.

## Data Model

The app defines these TypeScript entities:

- `User`
- `VocabWord`
- `Unit`
- `Question`
- `UnitAttempt`
- `QuestionAttempt`
- `WrongQuestion`

`WrongQuestion.status` can be `wrong`, `reviewing`, or `mastered`.

## Seed Data

The seed data includes six units:

1. Accounting Basics
2. Audit Basics
3. Financial Statements
4. Advanced Audit
5. CFA Finance Basics
6. Market Vocabulary

Each unit has six vocabulary words and ten quiz questions covering meaning MCQ, context MCQ, reverse MCQ, and similar-word distinction.

## Wrong-Question Practice

When a user completes a quiz, every incorrect answer is automatically added to the wrong-question pool. The review page supports:

- Due questions only
- All active wrong questions
- Correct review count
- Automatic mastery after three correct reviews

If the user answers correctly in review, `correctReviewCount` increases and the status becomes `reviewing` until it reaches three. If the user answers incorrectly again, the count resets to zero, `wrongCount` increases, and the status returns to `wrong`.

## Deployment

This project can be deployed to Vercel Hobby:

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Use the default Next.js settings.
4. Deploy.
