import { useState } from 'react'

export default function QuestionCard({ question, questionNumber, totalQuestions, onSubmit, onSkip, isLoading }) {
  const [answer, setAnswer] = useState('')
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length

  return (
    <div>
      <div className="q-card">
        <div className="q-number">Question {questionNumber} of {totalQuestions}</div>
        <p className="q-text">{question}</p>
      </div>

      <div className="answer-wrap">
        <textarea
          className="answer-textarea"
          placeholder="Type your answer here — be specific, use examples where you can..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isLoading}
        />
        <span className="word-count">{wordCount} words</span>
      </div>

      <div className="action-row">
        <button
          className="btn-primary"
          onClick={() => onSubmit(answer.trim())}
          disabled={isLoading || !answer.trim()}
        >
          {isLoading ? (
            <>
              <div className="spinner" />
              Evaluating
              <div className="loading-dots">
                <span /><span /><span />
              </div>
            </>
          ) : (
            <>✓ Submit Answer</>
          )}
        </button>
        <button className="btn-ghost" onClick={onSkip} disabled={isLoading}>
          Skip →
        </button>
      </div>
    </div>
  )
}