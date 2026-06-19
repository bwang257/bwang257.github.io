export default function IdentityHeader() {
  return (
    <div className="py-8 border-b border-white/5 mb-0">
      <div className="grid grid-cols-[1fr_auto] gap-12 items-start">
        {/* Left Side: Identity */}
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold tracking-tight text-white">
            Brian Wang
          </h1>
          <h2 className="text-lg font-mono text-slate-400">
            CS & Math @ WPI
          </h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            Interested in C++ systems, ML prediction work, market models, and software where assumptions get tested.
          </p>
        </div>

        {/* Right Side: Metadata Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <div className="text-[10px] uppercase text-slate-500 tracking-wide mb-1">
              CLASS
            </div>
            <div className="text-sm font-mono text-blue-400">
              Expected Dec 2027
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-500 tracking-wide mb-1">
              FOCUS
            </div>
            <div className="text-sm font-mono text-blue-400">
              Backend / C++ / Rust
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-500 tracking-wide mb-1">
              STATUS
            </div>
            <div className="text-sm font-mono text-blue-400">
              Open to Internships
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-500 tracking-wide mb-1">
              LOCATION
            </div>
            <div className="text-sm font-mono text-blue-400">
              Worcester, MA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
