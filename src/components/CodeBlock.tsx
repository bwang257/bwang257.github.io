interface CodeBlockProps {
  children: string;
  language?: string;
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  return (
    <pre className="bg-black dark:bg-gray-900 text-green-400 dark:text-green-500 font-mono text-sm p-4 rounded border border-gray-800 dark:border-gray-700 overflow-x-auto">
      <code className={language || ''}>{children}</code>
    </pre>
  );
}
