import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);

  const textareaRef = useRef(null);
  const [size, setSize] = useState({ width: 250, height: 120 });

  // Regex to detect {{variable}}
  const variableRegex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

  const extractVariables = (text) => {
    const vars = new Set();
    let match;
    while ((match = variableRegex.exec(text)) !== null) {
      vars.add(match[1]);
    }
    return Array.from(vars);
  };

  // Auto-resize logic
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);

    const el = textareaRef.current;
    if (el) {
      const newHeight = Math.min(Math.max(el.scrollHeight + 20, 80), 300);
      const newWidth = Math.min(250 + newText.length * 1.2, 450);
      setSize({ width: newWidth, height: newHeight });
    }
  };

  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  // handle positioning
  const getHandleTop = (index, total) => {
    if (total === 1) return "50%";
    return `${((index + 1) / (total + 1)) * 100}%`;
  };

  return (
    <div style={{ width: size.width, height: size.height, position: "relative" }}>

      {/* LEFT-SIDE VARIABLE PANEL */}
      {variables.length > 0 && (
        <div
          style={{
            position: "absolute",
            left: -160,
            top: 10,
            padding: "8px 12px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            width: 130,
          }}
        >
          <div style={{ fontSize: "11px", fontWeight: "bold", marginBottom: "6px", color: "#444" }}>
            INPUTS
          </div>

          {variables.map((v) => (
            <div 
              key={v}
              style={{
                fontSize: "11px",
                marginBottom: "4px",
                color: "#333",
                fontFamily: "monospace"
              }}
            >
              {v}
            </div>
          ))}
        </div>
      )}

      {/* NODE BODY */}
      <BaseNode title="Text" inputs={[]} outputs={[`${id}-output`]}>

        {/* ACTUAL HANDLES */}
        {variables.map((v, index) => (
          <Handle
            key={v}
            type="target"
            id={`${id}-${v}`}
            position={Position.Left}
            style={{
              top: getHandleTop(index, variables.length),
              background: "#333",
            }}
          />
        ))}

        {/* TEXTAREA */}
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "60px",
            resize: "none",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
      </BaseNode>
    </div>
  );
};
