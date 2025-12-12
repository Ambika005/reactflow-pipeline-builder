import { Handle, Position } from "reactflow";

export const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  children
}) => {

  return (
    <div style={{
  width: "100%",
  height: "100%",
  padding: 10,
  border: "1px solid black",
  borderRadius: 6,
  background: "white",
  display: "flex",
  flexDirection: "column"
  }}>


      {/* Title */}
      <div style={{ fontWeight: "bold", marginBottom: 6 }}>
        {title}
      </div>

      {/* Input Handles */}
      {inputs.map((inp, idx) => (
        <Handle
          type="target"
          position={Position.Left}
          id={inp}
          key={inp}
          style={{ top: `${(idx + 1) * 25}%` }}
        />
      ))}

      {/* Custom content */}
      <div style={{ flexGrow: 1, overflow: "hidden" }}>
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((out, idx) => (
        <Handle
          type="source"
          position={Position.Right}
          id={out}
          key={out}
          style={{ top: `${(idx + 1) * 25}%` }}
        />
      ))}

    </div>
  );
};
