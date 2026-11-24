import type { Shareholding } from "../../examples/corporate-structure/types";

export function RelationshipDetails({ relationship, isRoot }: { relationship: Shareholding; isRoot: boolean }) {
  return (
    <section className="detail-block" aria-labelledby="relationship-heading">
      <h3 id="relationship-heading">Relationship</h3>
      <p className="detail-note">Data of this occurrence only. It is not stored on the entity.</p>
      <dl className="defs">
        <div>
          <dt>Percentage</dt>
          <dd>{relationship.percentage}%</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{relationship.role}</dd>
        </div>
        <div>
          <dt>Started</dt>
          <dd>
            <time dateTime={relationship.startedAt}>{relationship.startedAt}</time>
          </dd>
        </div>
        <div>
          <dt>Ended</dt>
          <dd>{relationship.endedAt ? <time dateTime={relationship.endedAt}>{relationship.endedAt}</time> : "—"}</dd>
        </div>
        <div>
          <dt>Approved</dt>
          <dd>{relationship.approved ? "true" : "false"}</dd>
        </div>
        <div>
          <dt>Metadata</dt>
          <dd>{relationship.metadata.note}</dd>
        </div>
      </dl>
      {isRoot ? (
        <p className="detail-note">
          A root still carries a relationship, because <code>addNode</code> stores one on every occurrence. Relationship rules are not
          evaluated for roots: a root has no parent link.
        </p>
      ) : null}
    </section>
  );
}
