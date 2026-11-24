import { corporateDemo } from "../../examples/corporate-structure/structure";
import { EntityDetails } from "../hierarchy/EntityDetails";
import { RelationshipDetails } from "../hierarchy/RelationshipDetails";
import { StructureDetails } from "../hierarchy/StructureDetails";
import { StructureTree } from "../hierarchy/StructureTree";

interface InteractiveExampleProps {
  readonly selectedId: string;
  readonly expanded: ReadonlySet<string>;
  readonly onSelect: (id: string) => void;
  readonly onToggle: (id: string) => void;
}

export function InteractiveExample({ selectedId, expanded, onSelect, onToggle }: InteractiveExampleProps) {
  const { structure } = corporateDemo;
  const tree = structure.toTree();
  const validation = structure.validateStructure();
  const node = structure.findByNodeId(selectedId);
  const entity = node ? structure.findEntity(node.entityKey) : undefined;
  const parent = node ? structure.getParent(node.id) : undefined;
  const parentEntity = parent ? structure.findEntity(parent.entityKey) : undefined;
  const depth = node ? structure.getDepth(node.id) : undefined;
  const selectedKey = node && structure.getOccurrences(node.entityKey).length > 1 ? node.entityKey : null;

  const path =
    node === undefined
      ? []
      : structure.getPath(node.id).map((id) => {
          const step = structure.findByNodeId(id);
          const stepEntity = step ? structure.findEntity(step.entityKey) : undefined;
          return { id, name: stepEntity?.data.name ?? id };
        });

  const occurrences =
    node === undefined
      ? []
      : structure.getOccurrences(node.entityKey).map((occurrence) => {
          const occurrenceParent = structure.getParent(occurrence.id);
          const occurrenceParentEntity = occurrenceParent ? structure.findEntity(occurrenceParent.entityKey) : undefined;
          return { id: occurrence.id, parentName: occurrenceParentEntity?.data.name ?? "root" };
        });

  return (
    <section className="section wrap" id="example" aria-labelledby="example-heading">
      <div className="section-head">
        <h2 id="example-heading">Explore a real-world entity structure.</h2>
        <p className="section-lead">
          Explore the fictional corporate structure with multiple entity types, nested relationships and reusable identities.
        </p>
      </div>
      <p className="method-line">
        Built with <code>createEntityStructure</code> and <code>addNode</code>. Tree from <code>toTree()</code>.{" "}
        <span className={validation.valid ? "status-ok" : "status-bad"}>{validation.valid ? "validateStructure: valid" : "validateStructure: invalid"}</span>
      </p>
      <div className="example-layout">
        <div className="panel">
          <div className="panel-head">
            <h3>Structure</h3>
            <p>Expand and collapse is presentation state. The nodes underneath are the library tree.</p>
          </div>
          <StructureTree
            nodes={tree}
            selectedId={selectedId}
            sharedKey={selectedKey}
            expanded={expanded}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        </div>
        <aside className="panel detail-panel" aria-label="Selected occurrence">
          {node && entity && depth !== undefined ? (
            <>
              <EntityDetails record={entity} />
              <RelationshipDetails relationship={node.relationship} isRoot={parent === undefined} />
              <StructureDetails
                nodeId={node.id}
                parentName={parentEntity?.data.name ?? null}
                depth={depth}
                level={depth + 1}
                childCount={structure.getChildren(node.id).length}
                descendantCount={structure.getDescendants(node.id).length}
                path={path}
                occurrences={occurrences}
                onSelect={onSelect}
              />
              <p className="method-line">
                findByNodeId · findEntity · getParent · getDepth · getChildren · getDescendants · getPath · getOccurrences
              </p>
            </>
          ) : (
            <p>This occurrence is not in the structure.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
