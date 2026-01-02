interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B1120] main-content-pattern">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {children}
      </div>
    </div>
  );
}
