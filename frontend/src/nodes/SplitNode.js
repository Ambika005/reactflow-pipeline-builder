import { BaseNode } from "./BaseNode";

export const SplitNode = ({ id }) => {
  return (
    <BaseNode
      title="Split"
      inputs={[`${id}-input`]}
      outputs={[`${id}-part1`, `${id}-part2`]}
    >
      <div>Splits input into two branches.</div>
    </BaseNode>
  );
};
