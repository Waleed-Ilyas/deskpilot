export type Ticket = {
  id: string;
  customer: string;
  subject: string;
  body: string;
  status: 'New' | 'In progress' | 'Waiting' | 'Resolved';
  channel: 'Email' | 'Chat' | 'Phone';
  createdAt: string;
};

export const tickets: Ticket[] = [
  {
    id: 'TK-1042',
    customer: 'Alicia',
    subject: 'Payment was charged twice',
    body: 'I was charged twice for my monthly subscription and the receipt page is broken.',
    status: 'New',
    channel: 'Email',
    createdAt: '2026-09-29T10:15:00Z',
  },
  {
    id: 'TK-1041',
    customer: 'Daniel',
    subject: 'I cannot access the team dashboard',
    body: 'My account is locked after password reset and I cannot open the dashboard at all.',
    status: 'In progress',
    channel: 'Chat',
    createdAt: '2026-09-29T08:20:00Z',
  },
  {
    id: 'TK-1039',
    customer: 'Maya',
    subject: 'Package has not arrived',
    body: 'The shipping company says the package is out for delivery but I still have not received it.',
    status: 'Waiting',
    channel: 'Phone',
    createdAt: '2026-09-28T17:45:00Z',
  },
  {
    id: 'TK-1038',
    customer: 'Leo',
    subject: 'Export button is missing',
    body: 'The export CSV button is missing from the performance page after the recent update.',
    status: 'Resolved',
    channel: 'Email',
    createdAt: '2026-09-27T11:00:00Z',
  },
];

export const stats = [
  { label: 'Open tickets', value: '24', tone: 'blue' },
  { label: 'SLA risk', value: '6', tone: 'amber' },
  { label: 'Resolved today', value: '18', tone: 'green' },
  { label: 'Avg. first response', value: '24m', tone: 'purple' },
];
