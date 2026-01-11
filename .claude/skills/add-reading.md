# Add Reading

Add a new article, blog post, or paper to the readings page.

## Usage

User will provide:
- A URL/link to the article (required)
- Optional: Description of the article
- Optional: Screenshot of the article

## Instructions

When the user invokes this skill:

1. **Extract Information:**
   - Get the URL from the user
   - If description is not provided, analyze the URL or screenshot and create a concise description
   - **Description style**: Must be a SINGLE LINE that doesn't wrap to two lines. Keep it high-tasteful, generic, raw, ambitious, and contextually fulfilling. Aim for ~80-120 characters max.
   - Extract the source domain from the URL (e.g., "lesswrong.com" → "LessWrong", "arxiv.org" → "arXiv")
   - Use today's date in YYYY-MM-DD format

2. **Read the readings.astro file:**
   - Read `/Users/himanshu-upsurge/Desktop/himanshustwts/himanshustwts-page/src/pages/readings.astro`
   - Locate the `readings` array

3. **Add new entry:**
   - Add the new reading entry to the TOP of the `readings` array (so newest appears first)
   - Format:
   ```javascript
   {
     title: "Article Title Here",
     url: "full URL here",
     description: "One sentence description",
     date: "YYYY-MM-DD",
     source: "Source Name"
   },
   ```

4. **Update the file:**
   - Use the Edit tool to add the new entry to the readings array
   - Ensure proper formatting and commas

5. **Confirm:**
   - Tell the user the reading has been added
   - Show the title and URL

## Examples

**Example 1:**
User: "Add this reading: https://www.lesswrong.com/posts/abc123/some-article"
User provides description: "An interesting take on AI alignment"

**Example 2:**
User: "Add https://arxiv.org/abs/2401.12345"
User provides screenshot → Extract title and generate description from screenshot

**Example 3:**
User: "Add https://blog.example.com/post-title - This is about neural networks"

## Important Notes

- Always add new entries at the TOP of the array (newest first)
- Extract article title from URL, screenshot, or ask user if unclear
- Keep descriptions concise (1-2 sentences max)
- Common sources: LessWrong, arXiv, Medium, Substack, blog names
- Use today's date unless user specifies otherwise
