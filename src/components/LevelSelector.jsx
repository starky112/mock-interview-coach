const LEVELS = [
  { id: 'Fresher (0–1 yrs)', label: '🌱 Fresher', sub: '0–1 yrs' },
  { id: 'Junior (1–3 yrs)', label: '🚀 Junior', sub: '1–3 yrs' },
  { id: 'Mid-level (3–5 yrs)', label: '⚡ Mid-level', sub: '3–5 yrs' },
]

export default function LevelSelector({ selected, onSelect }) {
  return (
    <div className="level-row">
      {LEVELS.map((lvl) => (
        <button
          key={lvl.id}
          className={`level-btn ${selected === lvl.id ? 'selected' : ''}`}
          onClick={() => onSelect(lvl.id)}
        >
          {lvl.label}
          <span style={{ opacity: 0.6, marginLeft: 6, fontSize: '0.75rem' }}>
            {lvl.sub}
          </span>
        </button>
      ))}
    </div>
  )
}