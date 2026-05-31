function verdict(avg) {
  if (avg >= 8.5) return ['🏆', 'Interview Ready!', 'Outstanding performance across all questions.']
  if (avg >= 7) return ['✅', 'Strong Candidate', 'A little more polish and you\'re set.']
  if (avg >= 5.5) return ['👍', 'Solid Effort', 'Review the feedback and keep practising.']
  if (avg >= 4) return ['📚', 'Keep Going', 'Study the ideal answers and retry.']
  return ['💪', 'Just Getting Started', 'Every attempt makes you better.']
}

function scoreClass(s) {
  if (s >= 8) return 'high'
  if (s >= 5) return 'mid'
  if (s > 0) return 'low'
  return 'skip'
}

export default function Summary({ role, level, questions, scores, onRestart }) {
  const filled = scores.filter(s => s > 0)
  const avg = filled.length
    ? (filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(1)
    : '—'
  const [icon, title, sub] = verdict(parseFloat(avg))

  return (
    <div className="summary-card">
      <div className="text-center" style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div className="summary-score-big">{avg}</div>
        <div className="summary-verdict">{icon} {title}</div>
        <div className="summary-sub">{sub}</div>
      </div>

      <div className="summary-pills">
        <span className="summary-pill">🎯 {role}</span>
        <span className="summary-pill">📊 {level}</span>
        <span className="summary-pill">✅ {filled.length}/{questions.length} answered</span>
      </div>

      <div className="summary-divider" />

      <div className="summary-q-list">
        {questions.map((q, i) => (
          <div key={i} className="summary-q-row">
            <span className="sum-q-num">Q{i + 1}</span>
            <span className="sum-q-text">{q}</span>
            <span className={`sum-q-score ${scoreClass(scores[i])}`}>
              {scores[i] > 0 ? `${scores[i]}/10` : 'skip'}
            </span>
          </div>
        ))}
      </div>

      <button className="btn-restart" onClick={onRestart}>
        🔄 Start New Interview
      </button>
    </div>
  )
}