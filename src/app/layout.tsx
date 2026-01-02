import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brian Wang',
  description: 'Welcome to my personal website! My name is Brian Wang and I am a sophomore at Worcester Polytechnic Institute studying CS & Math.' ,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
