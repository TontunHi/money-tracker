export default function PingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-emerald-500 font-mono">
      <div className="p-8 border border-emerald-500/30 rounded-2xl bg-emerald-500/5 shadow-2xl shadow-emerald-500/10">
        <h1 className="text-2xl font-bold mb-2">PONG</h1>
        <p className="text-sm opacity-60">Deployment diagnostics successful.</p>
        <div className="mt-4 pt-4 border-t border-emerald-500/20 text-xs">
          Timestamp: {new Date().toISOString()}
        </div>
      </div>
    </div>
  );
}
