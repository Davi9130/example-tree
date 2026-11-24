import { carlos } from "../../examples/corporate-structure/entities";
import { corporateDemo } from "../../examples/corporate-structure/structure";
import { CodeExample } from "../code/CodeExample";

export function IdentityExample({ onSelect }: { onSelect: (id: string) => void }) {
  const { structure } = corporateDemo;
  const record = structure.findByIdentity(carlos.taxPayer);
  const occurrences = record ? structure.getOccurrences(record.key) : [];

  const snippet = record
    ? [
        `const entity = structure.findByIdentity(${JSON.stringify(carlos.taxPayer)});`,
        `// entity.key === ${JSON.stringify(record.key)}`,
        `// entity.data.name === ${JSON.stringify(record.data.name)}`,
        "",
        "const occurrences = structure.getOccurrences(entity.key);",
        ...occurrences.map((node, index) => {
          return `// [${index}] ${node.id}  entityKey ${node.entityKey}  ${node.relationship.role} ${node.relationship.percentage}%`;
        }),
      ].join("\n")
    : "// Carlos Mendes was not found";

  return (
    <section className="section wrap" id="identity" aria-labelledby="identity-heading">
      <h2 id="identity-heading">One entity. Multiple relationships.</h2>
      <p className="section-lead">The same entity can participate in multiple relationships without duplicating its central record.</p>
      {record ? (
        <div className="identity-layout">
          <article className="card identity-entity">
            <p className="kicker">Entity</p>
            <h3>{record.data.name}</h3>
            <p>
              <span className={`badge badge-${record.data.type.toLowerCase()}`}>{record.data.type}</span>
            </p>
            <p>
              <code>{record.key}</code>
            </p>
            <p className="detail-note">{occurrences.length} occurrences, one registration. getOccurrences lists them in pre-order.</p>
          </article>
          <ul className="identity-links">
            {occurrences.map((node) => {
              const parent = structure.getParent(node.id);
              const parentEntity = parent ? structure.findEntity(parent.entityKey) : undefined;
              return (
                <li key={node.id}>
                  <article className="card">
                    <p className="kicker">Relationship</p>
                    <h3>{node.relationship.role}</h3>
                    <p>{node.relationship.percentage}%</p>
                    <p className="detail-note">
                      <code>{node.id}</code> under {parentEntity?.data.name ?? "root"}
                    </p>
                    <button type="button" className="btn btn-secondary" onClick={() => onSelect(node.id)}>
                      Show in the tree
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <CodeExample code={snippet} filename="findByIdentity.ts" />
    </section>
  );
}
