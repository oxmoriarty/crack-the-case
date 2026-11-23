import { expect } from 'vitest';
import { test } from '../test';
import { evaluateVerdict, getPlayerProfile } from './game';
import { CASES } from '../../shared/cases/cases';
import { SOLUTIONS } from '../cases/solutions';

test('Should validate that all 40 cases have matching solutions', () => {
  expect(CASES.length).toBe(40);
  expect(SOLUTIONS.length).toBe(40);

  for (const c of CASES) {
    const s = SOLUTIONS.find((sol) => sol.caseNumber === c.caseNumber);
    expect(s, `Missing solution for case #${c.caseNumber}`).toBeDefined();
    if (!s) continue;

    // Culprit must exist in suspects
    const matchingSuspect = c.suspects.find((susp) => susp.id === s.culpritId);
    expect(
      matchingSuspect,
      `Culprit ${s.culpritName} not found in suspects of case #${c.caseNumber}`
    ).toBeDefined();

    // Decisive clue must exist in clues
    const matchingClue = c.clues.find((clue) => clue.id === s.decisiveClueId);
    expect(
      matchingClue,
      `Decisive clue ${s.decisiveClueTitle} not found in clues of case #${c.caseNumber}`
    ).toBeDefined();

    // Max 5 clues per case
    expect(c.clues.length).toBeLessThanOrEqual(5);
    // At least 3 suspects per case
    expect(c.suspects.length).toBeGreaterThanOrEqual(3);
  }
});

test('Should return WRONG_CHOICE on wrong culprit without revealing clue validity', async () => {
  const result = await evaluateVerdict('test_detective_1', {
    caseNumber: 1,
    culpritId: 'ivo-grant', // Wrong culprit (Mara Venn is correct)
    decisiveClueId: 'drawer-log', // Decisive clue
    activeDurationMs: 60000,
    usedHint: false,
  });

  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.state).toBe('WRONG_CHOICE');
  }

  // Verify profile was not modified
  const profile = await getPlayerProfile('test_detective_1');
  expect(profile.casesSolved).toBe(0);
  expect(profile.xp).toBe(0);
  expect(profile.currentStreak).toBe(0);
});

test('Should award partial points (40 culprit + 10 hint + time) and 60 XP for correct culprit with wrong clue', async () => {
  const result = await evaluateVerdict('test_detective_2', {
    caseNumber: 1,
    culpritId: 'mara-venn', // Correct
    decisiveClueId: 'reception-rota', // Wrong clue (drawer-log is decisive)
    activeDurationMs: 60000, // 60s <= 180s target => full 10 time pts
    usedHint: false,
  });

  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.result.isCulpritCorrect).toBe(true);
    expect(result.result.isClueCorrect).toBe(false);
    // 40 culprit + 0 clue + 10 no hint + 10 time = 60
    expect(result.result.score).toBe(60);
    // 50 culprit + 0 clue + 10 no hint = 60 XP
    expect(result.result.xpEarned).toBe(60);
  }

  const profile = await getPlayerProfile('test_detective_2');
  expect(profile.casesSolved).toBe(1);
  expect(profile.currentStreak).toBe(1);
  expect(profile.perfectDeductions).toBe(0);
  expect(profile.noHintSolves).toBe(1);
});

test('Should award full 100 points and 90 XP for Perfect Deduction (correct culprit + correct clue + no hint)', async () => {
  const result = await evaluateVerdict('test_detective_3', {
    caseNumber: 1,
    culpritId: 'mara-venn', // Correct
    decisiveClueId: 'drawer-log', // Correct
    activeDurationMs: 60000, // 10 time pts
    usedHint: false,
  });

  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.result.isCulpritCorrect).toBe(true);
    expect(result.result.isClueCorrect).toBe(true);
    expect(result.result.score).toBe(100);
    expect(result.result.xpEarned).toBe(90);
  }

  const profile = await getPlayerProfile('test_detective_3');
  expect(profile.casesSolved).toBe(1);
  expect(profile.perfectDeductions).toBe(1);
  expect(profile.achievements).toContain('perfect_detective');
  expect(profile.achievements).toContain('first_case');
});

test('Should remove only 10 points and 10 XP when hint is used', async () => {
  const result = await evaluateVerdict('test_detective_4', {
    caseNumber: 1,
    culpritId: 'mara-venn',
    decisiveClueId: 'drawer-log',
    activeDurationMs: 60000,
    usedHint: true, // Used hint
  });

  expect(result.success).toBe(true);
  if (result.success) {
    // 40 culprit + 40 clue + 0 hint + 10 time = 90
    expect(result.result.score).toBe(90);
    // 50 culprit + 30 clue + 0 hint = 80 XP
    expect(result.result.xpEarned).toBe(80);
  }

  const profile = await getPlayerProfile('test_detective_4');
  expect(profile.noHintSolves).toBe(0);
});

test('Should be idempotent: repeated submission returns cached result', async () => {
  const first = await evaluateVerdict('test_detective_5', {
    caseNumber: 1,
    culpritId: 'mara-venn',
    decisiveClueId: 'drawer-log',
    activeDurationMs: 60000,
    usedHint: false,
  });

  const second = await evaluateVerdict('test_detective_5', {
    caseNumber: 1,
    culpritId: 'mara-venn',
    decisiveClueId: 'drawer-log',
    activeDurationMs: 120000,
    usedHint: true,
  });

  expect(first.success).toBe(true);
  expect(second.success).toBe(true);
  if (first.success && second.success) {
    expect(second.result.score).toBe(first.result.score);
    expect(second.result.timestamp).toBe(first.result.timestamp);
  }
});
