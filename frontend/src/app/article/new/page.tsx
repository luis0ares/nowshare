"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import dynamic from "next/dynamic";
import { useState } from "react";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const md = `# Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Consectetur adipiscing

Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  

### Eiusmod tempor

- Lorem ipsum dolor sit amet  
- Consectetur adipiscing elit  
- Sed do eiusmod tempor incididunt  

### Dolore magna

\`\`\`typescript
function hello(name: string): string {
  return \`Hello, \${name}!\`;
}
console.log(hello("World"));
\`\`\`

## Tempor incididunt

Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  

### Incididunt ut labore

\`\`\`bash
echo "Lorem ipsum dolor sit amet"
\`\`\`
`;

export default function CreateArticlePage() {
  const [content, setContent] = useState<string>("");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl ">
      <MarkdownEditor
      placeholder={md}
        value={content}
        onChange={(value, viewUpdate) => setContent(value)}
        style={{maxHeight: "calc(80vh)"}}
        previewWidth="100%"
        renderPreview={() => <MarkdownRenderer content={content} />}
        enableScroll={false}
      />
    </div>
  );
}
