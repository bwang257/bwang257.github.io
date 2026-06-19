import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function NotesPage() {
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
            Notes Shelf
          </h1>
          <p className="max-w-2xl text-xl text-secondary leading-relaxed mb-10">
            A small collection of notes, observations, and references on systems and modeling.
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal>
        <div className="border border-border-subtle bg-surface p-16 text-center rounded-sm">
          <p className="text-secondary italic">Digital garden is currently being seeded. Notes will appear here shortly.</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
