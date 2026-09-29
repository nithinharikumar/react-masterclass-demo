import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export default function ConceptHeader({
  moduleNumber,
  title,
  subtitle,
  keyPoints = [],
  badgeColor = 'badge-primary'
}) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <span className={`badge ${badgeColor}`}>
          <BookOpen size={13} /> Module {moduleNumber}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Interactive Study Notes</span>
      </div>

      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
        {title}
      </h1>
      <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '850px', marginBottom: '1.25rem' }}>
        {subtitle}
      </p>

      {keyPoints.length > 0 && (
        <div className="card" style={{ padding: '1rem 1.25rem', background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#818cf8', marginBottom: '0.5rem' }}>
            What Students Will Learn
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem' }}>
            {keyPoints.map((point, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
