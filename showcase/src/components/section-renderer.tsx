import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders an allowlisted idea section's markdown. react-markdown does NOT
// render raw HTML by default (no rehype-raw), so this is XSS-safe for the
// self-authored content. Links open in a new tab with noopener.
export function SectionRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="md text-[15px] leading-relaxed text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
