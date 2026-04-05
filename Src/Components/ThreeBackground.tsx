const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">

      {/* ── Base: pure black ── */}
      <div className="absolute inset-0" style={{ background: '#080808' }} />

      {/* ── Neon  ── */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 55% 45% at 5% 0%, rgba(37,196,113,0.18) 0%, transparent 65%)',
      }} />

      {/* ── Electric  */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 50% 42% at 95% 0%, rgba(56,139,253,0.16) 0%, transparent 65%)',
      }} />

      {/* ──  ── */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 50% 40% at 95% 100%, rgba(139,92,246,0.14) 0%, transparent 60%)',
      }} />

      {/* ── ── */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 45% 38% at 5% 100%, rgba(34,211,238,0.12) 0%, transparent 60%)',
      }} />

      {/* ──  ── */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 30% 25% at 80% 50%, rgba(232,70,140,0.07) 0%, transparent 65%)',
      }} />

      {/* ──  ── */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

    </div>
  );
};

export default ThreeBackground;
