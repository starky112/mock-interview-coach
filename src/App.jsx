import { useState } from 'react'
import RoleSelector from './components/RoleSelector'
import LevelSelector from './components/LevelSelector'
import QuestionCard from './components/QuestionCard'
import FeedbackCard from './components/FeedbackCard'
import Summary from './components/Summary'
import { generateQuestions, evaluateAnswer } from './api'

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [role, setRole] = useState('')
  const [level, setLevel] = useState('Fresher (0–1 yrs)')
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [scores, setScores] = useState([])
  const [currentFb, setCurrentFb] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleStart() {
    setError('')
    setIsLoading(true)
    try {
      const qs = await generateQuestions(role, level)
      setQuestions(qs)
      setCurrentQ(0)
      setScores([])
      setCurrentFb(null)
      setScreen('interview')
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(answer) {
    setIsLoading(true)
    try {
      const fb = await evaluateAnswer(role, level, questions[currentQ], answer)
      setCurrentFb(fb)
      setScores(prev => [...prev, fb.score])
    } catch (e) {
      setError('Failed to evaluate. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSkip() {
    setScores(prev => [...prev, 0])
    if (currentQ + 1 >= questions.length) {
      setScreen('summary')
    } else {
      setCurrentQ(q => q + 1)
      setCurrentFb(null)
    }
  }

  function handleNext() {
    if (currentQ + 1 >= questions.length) {
      setScreen('summary')
    } else {
      setCurrentQ(q => q + 1)
      setCurrentFb(null)
    }
  }

  function handleRestart() {
    setRole('')
    setLevel('Fresher (0–1 yrs)')
    setQuestions([])
    setCurrentQ(0)
    setScores([])
    setCurrentFb(null)
    setError('')
    setScreen('setup')
  }

  const progress = questions.length > 0
    ? Math.round((currentQ / questions.length) * 100) : 0

  return (
    <div className="app-wrapper">

      {screen === 'setup' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="hero-badge">✦ AI Powered</div>
            <h1 className="hero-title">Mock Interview<br />Coach</h1>
            <p className="hero-sub">
              Practice with AI-curated questions tailored to your role.<br />
              Get instant feedback on every answer.
            </p>
          </div>

          <div className="mb-section">
            <div className="section-label">Choose your role</div>
            <RoleSelector selected={role} onSelect={setRole} />
          </div>

          <div className="mb-section">
            <div className="section-label">Experience level</div>
            <LevelSelector selected={level} onSelect={setLevel} />
          </div>

          {error && (
            <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            className="start-btn"
            onClick={handleStart}
            disabled={!role || isLoading}
          >
            {isLoading ? 'Preparing your interview...' : '▶ Start Interview'}
          </button>
          <p className="start-hint">5 questions · Role-specific · Instant AI feedback</p>
        </div>
      )}

      {screen === 'interview' && (
        <div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="interview-topbar">
            <div className="interview-role-badge">
              <span className="role-pill">{role}</span>
              <span className="level-pill">{level}</span>
            </div>
            <span className="q-counter">{currentQ + 1} / {questions.length}</span>
          </div>

          {!currentFb && (
            <QuestionCard
              question={questions[currentQ]}
              questionNumber={currentQ + 1}
              totalQuestions={questions.length}
              onSubmit={handleSubmit}
              onSkip={handleSkip}
              isLoading={isLoading}
            />
          )}

          {error && (
            <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem' }}>
              {error}
            </div>
          )}

          {currentFb && (
            <FeedbackCard
              feedback={currentFb}
              onNext={handleNext}
              isLast={currentQ + 1 >= questions.length}
            />
          )}
        </div>
      )}

      {screen === 'summary' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.75rem', fontWeight: 700, marginBottom: 6 }}>
              Interview Complete
            </h2>
            <p style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>
              Here's a full breakdown of your performance
            </p>
          </div>
          <Summary
            role={role}
            level={level}
            questions={questions}
            scores={scores}
            onRestart={handleRestart}
          />
        </div>
      )}

    </div>
  )
}