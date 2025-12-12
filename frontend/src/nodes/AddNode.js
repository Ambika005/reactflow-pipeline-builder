import { BaseNode } from "./BaseNode";

export const AddNode = ({ id }) => {
  return (
    <BaseNode
      title="Add"
      inputs={[`${id}-a`, `${id}-b`]}
      outputs={[`${id}-sum`]}
    >
      <div>Adds two values.</div>
    </BaseNode>
  );
};
