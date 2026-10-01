'use client';

import { useMemo, useState } from 'react';
import { classifyTicket } from '@/lib/ai';
import { tickets } from '@/lib/mockData';

const filters = ['All', 'New', 'In progress', 'Waiting', 'Resolved'] as const;

type Filter = (typeof filters)[number];

export default function Page() {
  const enriched = useMemo(
    () =>
      tickets.map((ticket) => ({
        ...ticket,
        assessment: classifyTicket(ticket.subject, ticket.body),
      })),
    [],
  );

  const [selectedStatus, setSelectedStatus] = useState<Filter>('All');
  const [selectedTicketId, setSelectedTicketId] = useState(enriched[0]?.id ?? '');

  const visibleTickets =
    selectedStatus === 'All'
      ? enriched
      : enriched.filter((ticket) => ticket.status === selectedStatus);

  const selectedTicket =
    visibleTickets.find((ticket) => ticket.id === selectedTicketId) ?? visibleTickets[0] ?? enriched[0];

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" />
          <span>DeskPilot</span>
        </div>

        <div className="topbar-actions">
          <button className="pill">Team inbox</button>
          <button className="primary">New ticket</button>
        </div>
      </header>

      <section className="stats">
        {[
          { label: 'Open tickets', value: '24' },
          { label: 'SLA risk', value: '6' },
          { label: 'Resolved today', value: '18' },
          { label: 'Avg. first response', value: '24m' },
        ].map((stat) => (
          <div key={stat.label} className="card stat-card">
            <div style={{ color: '#9db2cf', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {stat.label}
            </div>
            <span className="value">{stat.value}</span>
          </div>
        ))}
      </section>

      <div className="filter-row" aria-label="Ticket filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`filter-pill ${selectedStatus === filter ? 'active' : ''}`}
            onClick={() => setSelectedStatus(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid">
        <section className="card panel">
          <h2 style={{ marginTop: 0 }}>Inbox</h2>
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className={selectedTicket?.id === ticket.id ? 'ticket-row active' : 'ticket-row'}
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  <td>{ticket.customer}</td>
                  <td>
                    <div>{ticket.subject}</div>
                    <div className="meta">{ticket.id} • {ticket.channel} • {ticket.createdAt.slice(0, 10)}</div>
                  </td>
                  <td>
                    <span className="badge new">{ticket.assessment.category}</span>
                  </td>
                  <td>
                    <span className={`badge ${ticket.status.toLowerCase().replace(/\s+/g, '')}`}>
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="card panel">
          <h2 style={{ marginTop: 0 }}>AI triage</h2>
          {selectedTicket ? (
            <div className="detail-card">
              <div className="detail-topline">
                <span className="badge new">{selectedTicket.assessment.category}</span>
                <span className="badge inprogress">{selectedTicket.assessment.priority}</span>
              </div>

              <h3>{selectedTicket.subject}</h3>
              <div className="meta">{selectedTicket.customer} • {selectedTicket.channel} • {selectedTicket.createdAt.slice(0, 10)}</div>

              <div className="detail-grid">
                <div className="detail-block">
                  <strong>Suggested reply</strong>
                  <p>{selectedTicket.assessment.suggestedReply}</p>
                </div>
                <div className="detail-block">
                  <strong>SLA target</strong>
                  <p>{selectedTicket.assessment.sla}</p>
                </div>
              </div>

              <div className="summary-box">
                <strong>Customer issue</strong>
                <div className="meta" style={{ marginTop: 8 }}>{selectedTicket.body}</div>
              </div>
            </div>
          ) : (
            <p className="meta">No tickets match this filter.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
