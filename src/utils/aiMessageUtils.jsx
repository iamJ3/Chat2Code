import React, { useRef, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

export function WriteWIthAI(msg) {
  // If msg is an object, handle it properly
  if (typeof msg === "object" && msg !== null) {
    let displayText = msg.text || "";

    // If there's a fileTree, add information about the generated files
    if (msg.fileTree) {
      const fileNames = Object.keys(msg.fileTree);
      if (fileNames.length > 0) {
        displayText += `\n\n**Generated files:** ${fileNames.join(', ')}`;
      }
    }

    return (
      <div
        className="text-white bg-black rounded-md p-2"
        style={{
          maxWidth: "40vw",
          minWidth: "120px",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          overflowX: "auto",
        }}
      >
        <Markdown>{displayText}</Markdown>
      </div>
    );
  }

  // If msg is a string, try to parse as JSON and use .text, else show as is
  let text = "";
  if (typeof msg === "string") {
    let cleanMsg = msg.trim();
    if (cleanMsg.startsWith("```json")) cleanMsg = cleanMsg.replace(/^```json/, "").trim();
    if (cleanMsg.startsWith("```")) cleanMsg = cleanMsg.replace(/^```/, "").trim();
    if (cleanMsg.endsWith("```")) cleanMsg = cleanMsg.replace(/```$/, "").trim();

    try {
      const parsed = JSON.parse(cleanMsg);
      text = parsed.text || "";
    } catch {
      text = cleanMsg;
    }
  }

  return (
    <div className="w-full max-w-[85vw] md:max-w-[70%] bg-black text-white rounded-lg p-4 overflow-x-auto break-words whitespace-pre-wrap">
      <Markdown options={{ overrides: { code: { component: SyntaxHighlightedCode } } }}>
        {text}
      </Markdown>
    </div>
  );
}

export function SyntaxHighlightedCode(props) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && props.className?.includes('lang-') && window.hljs) {
      window.hljs.highlightElement(ref.current)

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute('data-highlighted')
    }
  }, [props.className, props.children])

  return <code {...props} ref={ref} />
} 