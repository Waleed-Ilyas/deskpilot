import { describe, it, expect } from 'vitest';
import { classifyTicket } from '@/lib/ai';

describe('DeskPilot AI triage', () => {
  it('flags billing issues as high priority', () => {
    const result = classifyTicket('Refund charged twice', 'I was billed twice for the same month and need a refund.');
    expect(result.category).toBe('Billing');
    expect(result.priority).toBe('Urgent');
    expect(result.sla).toBe('4 business hours');
  });

  it('routes access problems to an access workflow', () => {
    const result = classifyTicket('Cannot access dashboard', 'I reset my password but cannot sign in after the update.');
    expect(result.category).toBe('Access');
    expect(result.priority).toBe('High');
  });

  it('keeps general issues in a low-priority queue', () => {
    const result = classifyTicket('Question about onboarding', 'Can you tell me how to invite a teammate?');
    expect(result.category).toBe('General');
    expect(result.priority).toBe('Low');
  });
});
