import type { TreeNode } from "hierarch-tree";
import type { Party, Shareholding } from "../../examples/corporate-structure/types";

type DemoNode = TreeNode<Party, Shareholding>;

interface StructureNodeProps {
  readonly node: DemoNode;
  readonly selectedId: string;
  readonly sharedKey: string | null;
  readonly expanded: ReadonlySet<string>;
  readonly onToggle: (id: string) => void;
  readonly onSelect: (id: string) => void;
}

export function StructureNode({ node, selectedId, sharedKey, expanded, onToggle, onSelect }: StructureNodeProps) {
  const hasChildren = node.children.length > 0;
  const open = expanded.has(node.id);
  const selected = node.id === selectedId;
  const shared = sharedKey !== null && node.entityKey === sharedKey;

  return (
    <li className="tree-item" role="treeitem" aria-expanded={hasChildren ? open : undefined} aria-selected={selected}>
      <div className={`tree-row${selected ? " is-selected" : ""}${shared ? " is-shared" : ""}`}>
        {hasChildren ? (
          <button
            type="button"
            className="chevron"
            aria-label={`${open ? "Collapse" : "Expand"} ${node.entity.name}`}
            onClick={() => onToggle(node.id)}
          >
            <Caret open={open} />
          </button>
        ) : (
          <span className="chevron chevron-spacer" aria-hidden="true" />
        )}
        <button type="button" className="node-button" aria-current={selected ? "true" : undefined} onClick={() => onSelect(node.id)}>
          <span className="node-name">{node.entity.name}</span>
          <span className={`badge badge-${node.entity.type.toLowerCase()}`}>{node.entity.type}</span>
          <span className="node-share">{node.relationship.percentage}%</span>
          {shared ? <span className="sr-only">, shared identity</span> : null}
        </button>
      </div>
      {hasChildren && open ? (
        <ul className="tree-children" role="group">
          {node.children.map((child) => (
            <StructureNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              sharedKey={sharedKey}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function Caret({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={open ? "caret is-open" : "caret"}>
      <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
