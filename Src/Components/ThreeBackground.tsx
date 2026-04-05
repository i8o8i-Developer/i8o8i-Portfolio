const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base — pure near-black, no green tint */}
      <div className="absolute inset-0" style={{ background: '#080808' }} />

      {/* Single very subtle green glow — top-center only, kept minimal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 35% at 50% -10%, rgba(37,196,113,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Dot-grid — dim and neutral so it reads as texture, not colour */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(37,196,113,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};

export default ThreeBackground;
