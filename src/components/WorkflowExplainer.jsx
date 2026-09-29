import React, { useState } from 'react';
import {
  GitBranch,
  ArrowRight,
  Server,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Code2
} from 'lucide-react';

export default function WorkflowExplainer({
  title,
  conceptSummary,
  backendSummary,
  steps = [],
  codeSnippet = '',
  commonMistakes = []
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid #06b6d4', background: 'rgba(6, 182, 212, 0.03)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: 'var(--glass-border)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
            <GitBranch size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{title} — Under the Hood &amp; Workflow</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Interactive Step-by-Step Architecture Walkthrough</span>
          </div>
        </div>
        <span className="badge badge-primary">Classroom Teaching Mode</span>
      </div>

      {/* Conceptual & Backend Breakdown Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Cpu size={14} /> React Runtime &amp; Client Side
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {conceptSummary}
          </p>
        </div>

        <div style={{ padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Server size={14} /> Backend &amp; Network Protocol
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {backendSummary}
          </p>
        </div>
      </div>

      {/* Step-by-Step Lifecycle Stepper */}
      {steps.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Execution Pipeline (Click steps to teach students):
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: '0.5rem', marginBottom: '1rem' }}>
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="btn"
                style={{
                  padding: '0.5rem 0.6rem',
                  fontSize: '0.78rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  background: activeStep === idx ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'var(--bg-input)',
                  color: activeStep === idx ? '#ffffff' : 'var(--text-secondary)',
                  border: activeStep === idx ? '1px solid #06b6d4' : 'var(--glass-border)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.72rem', opacity: 0.8 }}>STEP {idx + 1}</span>
                <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div style={{ padding: '1rem 1.25rem', background: 'var(--bg-code)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#38bdf8' }}>
                Step {activeStep + 1}: {steps[activeStep]?.title}
              </div>
              <span className="badge badge-secondary" style={{ fontSize: '0.72rem' }}>
                {steps[activeStep]?.actor || 'System'}
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              {steps[activeStep]?.description}
            </p>
            {steps[activeStep]?.code && (
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '0.6rem 0.8rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#a5f3fc' }}>
                <code>{steps[activeStep].code}</code>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Common Mistakes & Interview Advice */}
      {commonMistakes.length > 0 && (
        <div style={{ padding: '0.85rem 1rem', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={15} /> Key Pitfalls &amp; Interview Tips to Teach
          </div>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {commonMistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
