import { BaseNode } from "./BaseNode";

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      title="Merge"
      inputs={[`${id}-input1`, `${id}-input2`]}
      outputs={[`${id}-merged`]}
    >
      <div>Merges two text inputs.</div>
    </BaseNode>
  );
};
