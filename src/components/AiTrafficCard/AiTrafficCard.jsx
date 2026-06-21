import { Sparkles } from 'lucide-react';
import './AiTrafficCard.scss';

const MAX_RAW = 12500;

const AI_SOURCES = [
  { id: 'chatgpt',    name: 'ChatGPT',    visits: '12.5K', raw: 12500 },
  { id: 'gemini',     name: 'Gemini',     visits: '6.8K',  raw: 6800  },
  { id: 'claude',     name: 'Claude',     visits: '5.1K',  raw: 5100  },
  { id: 'perplexity', name: 'Perplexity', visits: '3.2K',  raw: 3200  },
  { id: 'copilot',    name: 'Copilot',    visits: '1.7K',  raw: 1700  },
];

function ChatGptIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 30 30" fill="none">
      <rect width="30" height="30" rx="7" fill="#10A37F"/>
      <circle cx="15" cy="15" r="6" stroke="white" strokeWidth="1.4" fill="none"/>
      <circle cx="15" cy="15" r="2.4" fill="white"/>
      <line x1="15" y1="7.5"  x2="15" y2="9.5"  stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="15" y1="20.5" x2="15" y2="22.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="7.5" y1="15"  x2="9.5" y2="15"  stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="20.5" y1="15" x2="22.5" y2="15" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="10.1" y1="10.1" x2="11.5" y2="11.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="18.5" y1="18.5" x2="19.9" y2="19.9" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="19.9" y1="10.1" x2="18.5" y2="11.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="11.5" y1="18.5" x2="10.1" y2="19.9" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function GeminiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 30 30" fill="none">
      <rect width="30" height="30" rx="7" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
      <path d="M15 4C15 10.627 10.627 15 4 15C10.627 15 15 19.373 15 26C15 19.373 19.373 15 26 15C19.373 15 15 10.627 15 4Z"
        fill="url(#gemini-grad)"/>
      <defs>
        <linearGradient id="gemini-grad" x1="4" y1="4" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#4285F4"/>
          <stop offset="100%" stopColor="#0F9D58"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 30 30" fill="none">
      <rect width="30" height="30" rx="7" fill="#CC785C"/>
      <path d="M10.5 21L15 9L19.5 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.2 17H17.8"         stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

function PerplexityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 30 30" fill="none">
      <rect width="30" height="30" rx="7" fill="#1A1A1A"/>
      <path d="M15 8V22M9 11L21 19M21 11L9 19" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function CopilotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 30 30" fill="none">
      <rect width="30" height="30" rx="7" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
      <rect x="7"  y="7"  width="7" height="7" rx="1.5" fill="#F25022"/>
      <rect x="16" y="7"  width="7" height="7" rx="1.5" fill="#7FBA00"/>
      <rect x="7"  y="16" width="7" height="7" rx="1.5" fill="#FFB900"/>
      <rect x="16" y="16" width="7" height="7" rx="1.5" fill="#00A4EF"/>
    </svg>
  );
}

const SOURCE_ICONS = {
  chatgpt:    <ChatGptIcon />,
  gemini:     <GeminiIcon />,
  claude:     <ClaudeIcon />,
  perplexity: <PerplexityIcon />,
  copilot:    <CopilotIcon />,
};

export function AiTrafficCard() {
  return (
    <div className="ai-traffic-card">
      <div className="ai-traffic-card__header">
        <span className="ai-traffic-card__icon-wrap" aria-hidden="true">
          <Sparkles size={13} strokeWidth={1.75} />
        </span>
        <h2 className="ai-traffic-card__title">AI Traffic Data</h2>
      </div>

      <div className="ai-traffic-card__metrics">
        <div className="ai-traffic-card__metric">
          <span className="ai-traffic-card__metric-label">Total AI Visits</span>
          <span className="ai-traffic-card__metric-value">28.6K</span>
        </div>
        <div className="ai-traffic-card__metric-divider" />
        <div className="ai-traffic-card__metric">
          <span className="ai-traffic-card__metric-label">% of Total Visits</span>
          <span className="ai-traffic-card__metric-value">0.68%</span>
        </div>
      </div>

      <div className="ai-traffic-card__table">
        <div className="ai-traffic-card__table-head">
          <span>AI Source</span>
          <span>Visits</span>
        </div>
        {AI_SOURCES.map((source, i) => (
          <div key={source.id} className="ai-traffic-card__row">
            <div className="ai-traffic-card__source-info">
              <span className="ai-traffic-card__icon">{SOURCE_ICONS[source.id]}</span>
              <span className="ai-traffic-card__source-name">{source.name}</span>
            </div>
            <div className="ai-traffic-card__bar-track">
              <div
                className="ai-traffic-card__bar-fill"
                style={{
                  width: `${(source.raw / MAX_RAW) * 100}%`,
                  animationDelay: `${i * 120}ms`,
                }}
              />
            </div>
            <span className="ai-traffic-card__visits">{source.visits}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
