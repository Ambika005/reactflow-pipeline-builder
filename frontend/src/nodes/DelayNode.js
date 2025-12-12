import { useState } from "react";
import { BaseNode } from "./BaseNode";


export const DelayNode = ({ id }) => {
  const [ms, setMs] = useState(1000);

  return (
    <BaseNode
      title="Delay"
      inputs={[`${id}-input`]}
      outputs={[`${id}-output`]}
    >
      <label>
        Delay (ms):
        <input 
          type="number" 
          value={ms} 
          onChange={(e) => setMs(e.target.value)} 
        />
      </label>
    </BaseNode>
  );
};
