import type { TreeNode } from "hierarch-tree";
import type { Party, Shareholding } from "../../examples/corporate-structure/types";
import { StructureNode } from "./StructureNode";

interface StructureTreeProps {
  readonly nodes: readonly TreeNode<Party, Shareholding>[];
  readonly selectedId: string;
  readonly sharedKey: string | null;
  readonly expanded: ReadonlySet<string>;
  readonly onToggle: (id: string) => void;
  readonly onSelect: (id: string) => void;
}

export function StructureTree({ nodes, selectedId, sharedKey, expanded, onToggle, onSelect }: StructureTreeProps) {
  return (
    <ul className="tree" role="tree" aria-label="Corporate structure">
      {nodes.map((node) => (
        <StructureNode
          key={node.id}
          node={node}
          selectedId={selectedId}
          sharedKey={sharedKey}
          expanded={expanded}
          onToggle={onToggle}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
