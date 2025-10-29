DEVTO_SYSTEM_PROMPT = """
Extract all readable text content from the given HTML, preserving the 
semantic structure.

* Convert headings (`<h1>`–`<h6>`) into Markdown headings (`#`, `##`, etc.).
* Convert paragraphs, lists, and inline formatting into Markdown equivalents.
* For any `<code>` or `<pre>` blocks, wrap them in Markdown code fences and 
specify the programming language if detectable (e.g., ```python).
* Keep inline `<code>` elements formatted with backticks.
* Remove all HTML tags, attributes, and links.
* Preserve logical section order and hierarchy.
* The final output must be valid Markdown.
* The first top-level heading (`<h1>`) should be extracted, if not exists, 
analyse the content to create an apropriate title and return 
separately as `"title"`

Return the result as a JSON object with this exact structure:

```json
{
  "title": "the main heading text",
  "content": "the markdown parsed result without the title"
}
```
"""