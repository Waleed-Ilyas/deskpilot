export type TicketCategory = 'Billing' | 'Product' | 'Access' | 'Delivery' | 'General';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TicketAssessment = {
  category: TicketCategory;
  priority: TicketPriority;
  suggestedReply: string;
  sla: string;
};

export function classifyTicket(title: string, body: string): TicketAssessment {
  const text = `${title} ${body}`.toLowerCase();

  if (/(refund|charge|invoice|billing|payment|subscription|card|receipt)/.test(text)) {
    return {
      category: 'Billing',
      priority: /(urgent|charged|double|fraud|cancel)/.test(text) ? 'Urgent' : 'High',
      suggestedReply:
        'Thanks for flagging this. I’m checking the billing record and will confirm the next step with you in a few hours.',
      sla: '4 business hours',
    };
  }

  if (/(bug|broken|error|issue|login|access|password|cannot|unable|404|500|slow)/.test(text)) {
    return {
      category: 'Access',
      priority: /(cannot login|locked|blocked|urgent|down|cannot access)/.test(text) ? 'High' : 'Medium',
      suggestedReply:
        'I’ve flagged this to the support team and am reviewing the account or service issue you described.',
      sla: '1 business day',
    };
  }

  if (/(shipping|delivery|arrived|delayed|package|order|missing|late)/.test(text)) {
    return {
      category: 'Delivery',
      priority: /(late|missing|not arrived|stolen|urgent)/.test(text) ? 'High' : 'Medium',
      suggestedReply:
        'I’m tracking the delivery status and will send the latest update as soon as the carrier confirms it.',
      sla: '8 business hours',
    };
  }

  if (/(feature|product|dashboard|ui|layout|button|overview|report|search)/.test(text)) {
    return {
      category: 'Product',
      priority: /(broken|missing|critical|urgent)/.test(text) ? 'High' : 'Medium',
      suggestedReply:
        'Thanks for the detailed feedback. I’ve logged this as a product issue and we’ll review the workflow you described.',
      sla: '1 business day',
    };
  }

  return {
    category: 'General',
    priority: 'Low',
    suggestedReply:
      'Thanks for getting in touch. I’ve reviewed your request and I’m checking the best next step with our team.',
    sla: '2 business days',
  };
}
