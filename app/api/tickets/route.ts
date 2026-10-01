import { NextResponse } from 'next/server';
import { tickets } from '@/lib/mockData';
import { classifyTicket } from '@/lib/ai';

export async function GET() {
  return NextResponse.json(
    tickets.map((ticket) => ({
      ...ticket,
      assessment: classifyTicket(ticket.subject, ticket.body),
    })),
  );
}
