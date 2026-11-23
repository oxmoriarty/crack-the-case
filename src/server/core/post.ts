import { reddit } from '@devvit/web/server';
import { getCaseByNumber } from '../../shared/cases/cases';

export const createPost = async (caseNumber = 1) => {
  const caseData = getCaseByNumber(caseNumber) ?? getCaseByNumber(1)!;
  return await reddit.submitCustomPost({
    title: `CASE #${caseData.caseNumber}\n${caseData.title}`,
  });
};
