function cls(s) { return s >= 8 ? 'high' : s >= 5 ? 'mid' : 'low' }

function verdict(s) {
  if (s >= 9) return ['🏆', 'Excellent Answer', 'Top tier response']
  if (s >= 8) return ['✅', 'Strong Answer', 'Well structured']
  if (s >= 6) return ['👍', 'Good Attempt', 'Room to improve']
  if (s >= 4) return ['⚠️', 'Needs More Depth', 'Study the ideal answer']
  return ['📚', 'Keep Practising', 'Review and retry']
}

export default function FeedbackCard({ feedback, onNext, isLast }) {
  const c = cls(feedback.score)
  const [icon, title, sub] = verdict(feedback.score)

  return (
    <div className="feedback-card">
      <div className="feedback-score-row">
        <div className={`score-circle ${c}`}>
          {feedback.score}/10
        </div>
        <div style={{ flex: 1 }}>
          <div className="score-verdict">{icon} {title}</div>
          <div className="score-sub">{sub}</div>
          <div className="score-bar-track">
            <div
              className={`score-bar-fill ${c}`}
              style={{ width: `${feedback.score * 10}%` }}
            />
          </div>
        </div>
      </div>

      <div className="fb-block">
        <div className="fb-tag good">✦ What Worked</div>
        <p className="fb-text">{feedback.good}</p>
      </div>

      <div className="fb-block">
        <div className="fb-tag miss">⚠ What Was Missing</div>
        <p className="fb-text">{feedback.missing}</p>
      </div>

      <div className="fb-block">
        <div className="fb-tag ideal">💡 Ideal Answer</div>
        <p className="fb-text">{feedback.ideal}</p>
      </div>

      <button className="btn-next" onClick={onNext}>
        {isLast ? '📊 View My Results' : 'Next Question →'}
      </button>
    </div>
  )
}