import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function LearningPage() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6 py-24 text-primary bg-background">
      <Link
        href="/"
        className="group mb-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 duration-200" />
        Home
      </Link>
      
      <ScrollReveal>
        <header className="mb-20">
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-primary mb-6 leading-[1.1]">
            Learning Log
          </h1>
          <p className="max-w-2xl text-xl text-secondary leading-relaxed mb-10">
            A real-time index of topics I am currently studying, researching, or building intuition for.
          </p>
        </header>
      </ScrollReveal>

      <div className="flex flex-col gap-12">
        <ScrollReveal>
          <div className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border-subtle pt-12">
            <div className="font-mono text-xs uppercase tracking-widest text-muted">Current Focus</div>
            <div>
              <h3 className="font-serif text-2xl text-primary mb-3">Compilers & Code Generation</h3>
              <p className="text-secondary leading-relaxed">
                Studying LLVM IR and the frontend stages of compilation. Working through crafting a simple recursive descent parser in C++ to better understand AST transformations and intermediate representations.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border-subtle pt-12">
            <div className="font-mono text-xs uppercase tracking-widest text-muted">Mathematical Modeling</div>
            <div>
              <h3 className="font-serif text-2xl text-primary mb-3">Stochastic Differential Equations</h3>
              <p className="text-secondary leading-relaxed">
                Deepening understanding of continuous-time stochastic processes. Currently reviewing Ito calculus and geometric Brownian motion to improve the rigor of my applied modeling simulations.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-border-subtle pt-12 border-b border-border-subtle pb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-muted">Reading Shelf</div>
            <ul className="flex flex-col gap-6 text-secondary mt-1">
              <li className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <strong className="font-medium text-primary">Designing Data-Intensive Applications</strong>
                <span className="font-mono text-xs text-muted md:ml-auto">Active Study</span>
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <strong className="font-medium text-primary">Computer Systems: A Programmer&apos;s Perspective</strong>
                <span className="font-mono text-xs text-muted md:ml-auto">Reference</span>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
