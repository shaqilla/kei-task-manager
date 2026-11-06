export const StatCard = ({ icon: Icon, label, value, variant = 'primary' }) => {
  return (
    <div className="card stat-card">
      <div className={`stat-icon ${variant}`}>
        <Icon size={22} />
      </div>
      <div>
        <div className="stat-val">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
};