export default function GradientMeshBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="mesh-blob-1 absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)' }}
      />
      <div
        className="mesh-blob-2 absolute -bottom-1/4 -right-1/4 w-[50%] h-[50%] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)' }}
      />
      <div
        className="mesh-blob-3 absolute top-1/3 right-1/4 w-[40%] h-[40%] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)' }}
      />
    </div>
  );
}
