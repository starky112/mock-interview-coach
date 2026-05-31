const ROLES = [
  { id: 'Frontend Developer', icon: '🎨', sub: 'React · CSS · JS' },
  { id: 'Backend Developer', icon: '⚙️', sub: 'APIs · DBs · Node' },
  { id: 'Full Stack Developer', icon: '🧱', sub: 'End-to-end Dev' },
  { id: 'Data Scientist', icon: '📊', sub: 'ML · Python · Stats' },
  { id: 'UI/UX Designer', icon: '✏️', sub: 'Figma · Research' },
  { id: 'Product Manager', icon: '🎯', sub: 'Strategy · Metrics' },
]

export default function RoleSelector({ selected, onSelect }) {
  return (
    <div className="role-grid">
      {ROLES.map((role) => (
        <div
          key={role.id}
          className={`role-card ${selected === role.id ? 'selected' : ''}`}
          onClick={() => onSelect(role.id)}
        >
          <span className="role-icon">{role.icon}</span>
          <span className="role-title">{role.id}</span>
          <span className="role-sub">{role.sub}</span>
        </div>
      ))}
    </div>
  )
}