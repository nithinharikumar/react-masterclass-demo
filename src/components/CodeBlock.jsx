import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

export default function CodeBlock({ title, code, language = 'jsx' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-container">
      <div className="code-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code2 size={16} color="#818cf8" />
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{title || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="btn"
          style={{
            padding: '0.25rem 0.6rem',
            fontSize: '0.75rem',
            background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            color: copied ? '#34d399' : 'var(--text-secondary)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} /> Copied!
            </>
          ) : (
            <>
              <Copy size={13} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-content">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
