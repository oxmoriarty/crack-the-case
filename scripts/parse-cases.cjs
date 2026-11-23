const fs = require('fs');
const path = require('path');

const mdPath = path.resolve('Crack_The_Case_Reference/04_Case_Content/Crack_The_Case_40_Daily_Cases.md');
const content = fs.readFileSync(mdPath, 'utf8');
const caseBlocks = content.split(/^## CASE #/m).slice(1);

const cases = [];
const solutions = [];

for (const block of caseBlocks) {
  const headerMatch = block.match(/^(\d+)\s*[-—]\s*(.+?)\r?\n/);
  if (!headerMatch) throw new Error('Failed header: ' + block.slice(0, 50));
  const caseNumber = parseInt(headerMatch[1], 10);
  const title = headerMatch[2].trim();

  const diffMatch = block.match(/\*\*Difficulty:\*\*\s*(Easy|Standard|Challenging)/i);
  const incidentMatch = block.match(/\*\*Incident:\*\*\s*([\s\S]+?)(?=\r?\n\r?\n### Suspects)/i);
  
  const suspectsBlockMatch = block.match(/### Suspects\r?\n([\s\S]+?)(?=\r?\n\r?\n### Clues)/i);
  const cluesBlockMatch = block.match(/### Clues\r?\n([\s\S]+?)(?=\r?\n\r?\n### Hint)/i);
  const hintMatch = block.match(/### Hint\r?\n([\s\S]+?)(?=\r?\n\r?\n### Authoritative answer key)/i);
  const keyBlockMatch = block.match(/### Authoritative answer key\r?\n([\s\S]+?)(?=(\r?\n---\r?\n|$))/i);

  if (!diffMatch || !incidentMatch || !suspectsBlockMatch || !cluesBlockMatch || !hintMatch || !keyBlockMatch) {
    throw new Error('Case missing section: ' + caseNumber);
  }

  const difficulty = diffMatch[1].trim();
  const incident = incidentMatch[1].trim();
  const hint = hintMatch[1].trim();

  // Parse suspects: - **Name — Role:** “Statement”
  const suspects = [];
  const suspectLines = suspectsBlockMatch[1].trim().split(/\r?\n/).filter(l => l.trim().startsWith('-'));
  for (const line of suspectLines) {
    const sm = line.match(/^-\s*\*\*(.+?)\s*[-—]\s*(.+?):\*\*\s*["“]?([\s\S]+?)["”]?$/);
    if (!sm) throw new Error('Suspect parse error in case ' + caseNumber + ': ' + line);
    const name = sm[1].trim();
    const role = sm[2].trim();
    let statement = sm[3].trim();
    if (statement.endsWith('”') || statement.endsWith('"')) statement = statement.slice(0, -1);
    if (statement.startsWith('“') || statement.startsWith('"')) statement = statement.slice(1);
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    suspects.push({ id, name, role, avatar: '/snoo.png', statement });
  }

  // Parse clues: 1. **Title:** Description
  const clues = [];
  const clueLines = cluesBlockMatch[1].trim().split(/\r?\n/).filter(l => /^\d+\.\s*\*\*/.test(l.trim()));
  let clueIndex = 0;
  const stickerRotations = [-2, 1.5, -1, 2, -1.5];
  for (const line of clueLines) {
    const cm = line.match(/^\d+\.\s*\*\*(.+?):\*\*\s*([\s\S]+)$/);
    if (!cm) throw new Error('Clue parse error in case ' + caseNumber + ': ' + line);
    const clueTitle = cm[1].trim();
    const description = cm[2].trim();
    const id = clueTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const rot = stickerRotations[clueIndex % stickerRotations.length];
    clues.push({
      id,
      title: clueTitle,
      description,
      type: 'note',
      rotationDeg: rot
    });
    clueIndex++;
  }

  // Parse answer key
  const keyBlock = keyBlockMatch[1];
  const culpritMatch = keyBlock.match(/\*\*Culprit:\*\*\s*(.+)/i);
  const decisiveMatch = keyBlock.match(/\*\*Decisive clue:\*\*\s*(.+)/i);
  const explanationMatch = keyBlock.match(/\*\*Solution explanation:\*\*\s*([\s\S]+?)(?=\r?\n-\s*\*\*Deduction check|\r?\n|$)/i);
  const deductionMatch = keyBlock.match(/\*\*Deduction check:\*\*\s*([\s\S]+?)(?=\r?\n|$)/i);

  if (!culpritMatch || !decisiveMatch) {
    throw new Error('Key missing culprit or decisive clue in case ' + caseNumber);
  }

  const culpritName = culpritMatch[1].trim();
  const decisiveTitle = decisiveMatch[1].trim();
  const explanation = explanationMatch ? explanationMatch[1].trim() : '';
  const deductionCheck = deductionMatch ? deductionMatch[1].trim() : '';

  // Validate culprit matches suspect
  const matchingSuspect = suspects.find(s => s.name.toLowerCase() === culpritName.toLowerCase());
  if (!matchingSuspect) {
    throw new Error('Culprit "' + culpritName + '" not found in suspects of case ' + caseNumber + '. Suspects: ' + suspects.map(s => s.name).join(', '));
  }

  // Validate decisive clue matches clue
  const matchingClue = clues.find(c => c.title.toLowerCase() === decisiveTitle.toLowerCase());
  if (!matchingClue) {
    throw new Error('Decisive clue "' + decisiveTitle + '" not found in clues of case ' + caseNumber + '. Clues: ' + clues.map(c => c.title).join(', '));
  }

  cases.push({ caseNumber, title, difficulty, incident, suspects, clues, hint });
  solutions.push({
    caseNumber,
    culpritId: matchingSuspect.id,
    culpritName: matchingSuspect.name,
    decisiveClueId: matchingClue.id,
    decisiveClueTitle: matchingClue.title,
    solutionExplanation: explanation,
    deductionCheck
  });
}

console.log('SUCCESS: All ' + cases.length + ' cases parsed and verified.');

// Ensure target directories exist
fs.mkdirSync(path.resolve('src/shared/cases'), { recursive: true });
fs.mkdirSync(path.resolve('src/server/cases'), { recursive: true });

// Write src/shared/cases/cases.ts (client-safe cases)
const casesTs = `// AUTOGENERATED FROM Crack_The_Case_40_Daily_Cases.md
// Contains client-safe case data (NO solution keys, NO decisive clue markers)

export type CaseDifficulty = 'Easy' | 'Standard' | 'Challenging';

export type Suspect = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  statement: string;
};

export type ClueType = 'record' | 'sensor' | 'note' | 'document' | 'photograph' | 'physical';

export type Clue = {
  id: string;
  title: string;
  description: string;
  type: ClueType;
  rotationDeg: number;
};

export type CaseData = {
  caseNumber: number;
  title: string;
  difficulty: CaseDifficulty;
  incident: string;
  suspects: Suspect[];
  clues: Clue[];
  hint: string;
};

export const CASES: readonly CaseData[] = ${JSON.stringify(cases, null, 2)} as const;

export const getCaseByNumber = (caseNumber: number): CaseData | undefined => {
  return CASES.find((c) => c.caseNumber === caseNumber);
};
`;

fs.writeFileSync(path.resolve('src/shared/cases/cases.ts'), casesTs, 'utf8');
console.log('Wrote src/shared/cases/cases.ts');

// Write src/server/cases/solutions.ts (server-only answer keys)
const solutionsTs = `// AUTOGENERATED FROM Crack_The_Case_40_Daily_Cases.md
// AUTHORITATIVE SERVER-SIDE SOLUTION KEYS ONLY.
// DO NOT IMPORT THIS FILE IN CLIENT CODE OR EXPOSE THROUGH PUBLIC TRPC PAYLOADS!

export type CaseSolution = {
  caseNumber: number;
  culpritId: string;
  culpritName: string;
  decisiveClueId: string;
  decisiveClueTitle: string;
  solutionExplanation: string;
  deductionCheck: string;
};

export const SOLUTIONS: readonly CaseSolution[] = ${JSON.stringify(solutions, null, 2)} as const;

export const getSolutionByCaseNumber = (caseNumber: number): CaseSolution | undefined => {
  return SOLUTIONS.find((s) => s.caseNumber === caseNumber);
};
`;

fs.writeFileSync(path.resolve('src/server/cases/solutions.ts'), solutionsTs, 'utf8');
console.log('Wrote src/server/cases/solutions.ts');
