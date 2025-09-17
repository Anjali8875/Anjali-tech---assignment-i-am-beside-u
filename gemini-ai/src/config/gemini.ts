
type GenerateResponse = {
  text: string;
  raw?: unknown;
};

export async function askServer(prompt: string, setOutput: (val: string) => void) {
  try {
    console.log("✅ User prompt:", prompt); // Debug: kya prompt aa raha hai

    const MASTER_INSTRUCTION = `You are a smart AI assistant. Always answer in well-formatted Markdown.

**Formatting rules (must follow):**
1. Always include code as fenced code blocks using triple backticks with a language tag.
   - For JavaScript use: \`\`\`javascript
   - For Bash use: \`\`\`bash
   - For JSON use: \`\`\`json
2. When asked for code, provide:
   - A short explanation paragraph (1-2 sentences).
   - A fenced code block with the runnable code (language tagged).
   - An **Example** section with a fenced code block showing how to run/use the code.
   - An **Output** section with a fenced block showing expected output.
3. Use headings for sections:
   - \`#\` for main title, \`##\` for subsections (e.g., Example, Output).
4. Use **bold** for important terms.
5. Add blank lines between sections for readability.
6. Never return plain continuous text when code is requested — always include the code block and example.
`;

    const bodyData = {
      taskType: "general",  // ensure taskType is defined
      prompt: MASTER_INSTRUCTION + "\n\nUser prompt: " + prompt,
    };

    console.log("📤 Sending to server:", bodyData); // Debug: server ko kya bhej rahe ho

    const res = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    console.log("⏳ Response status:", res.status, res.statusText); // Debug: server response

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Server returned error body:", errorText);
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    const data: GenerateResponse = await res.json();
    console.log("📥 Server returned:", data); // Debug: response content

    setOutput(data.text ?? "⚠️ No text returned from server");
  } catch (err: any) {
    console.error("💥 askServer error:", err);
    setOutput(`Error: ${err.message || "Unknown error"}`);
  }
}
