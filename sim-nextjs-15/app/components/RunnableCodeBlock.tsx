import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, gruvboxLight, gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MDXCodeProps {
    children: string;
    className?: string;
}

export const MDXCode: React.FC<MDXCodeProps> = ({ children, className }) => {
    // Extract language from className (format: "language-javascript")
    const language = className?.replace('language-', '') || 'text';

    // Only process if it's a code block (has className)
    if (className) {
        return (

            <pre className={`rounded-lg p-4 overflow-x-auto ${className}`}>
                <SyntaxHighlighter language={language} style={gruvboxDark}>
                    {children}
                </SyntaxHighlighter>
            </pre>

        );
    }

    // For inline code, just return basic styling
    return <code className="px-1 rounded">{children}</code>;
};
