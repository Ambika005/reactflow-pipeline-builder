import { BaseNode } from "./BaseNode";

export const SubtractNode = ({ id }) => {
  return (
    <BaseNode
      title="Subtract"
      inputs={[`${id}-x`, `${id}-y`]}
      outputs={[`${id}-result`]}
    >
      <div>Subtracts second value from first.</div>
    </BaseNode>
  );
};
