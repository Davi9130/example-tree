export interface OccurrenceSummary {
  readonly id: string;
  readonly parentName: string;
}

export interface PathStep {
  readonly id: string;
  readonly name: string;
}

interface StructureDetailsProps {
  readonly nodeId: string;
  readonly parentName: string | null;
  readonly depth: number;
  readonly level: number;
  readonly childCount: number;
  readonly descendantCount: number;
  readonly path: readonly PathStep[];
  readonly occurrences: readonly OccurrenceSummary[];
  readonly onSelect: (id: string) => void;
}

export function StructureDetails({
  nodeId,
  parentName,
  depth,
  level,
  childCount,
  descendantCount,
  path,
  occurrences,
  onSelect,
}: StructureDetailsProps) {
  return (
    <section className="detail-block" aria-labelledby="structure-heading">
      <h3 id="structure-heading">Structure</h3>
      <p className="detail-note">This occurrence. Depth comes from getDepth, which is 0 at the root. Level is depth + 1.</p>
      <dl className="defs">
        <div>
          <dt>Occurrence</dt>
          <dd>
            <code>{nodeId}</code>
          </dd>
        </div>
        <div>
          <dt>Parent</dt>
          <dd>{parentName ?? "None"}</dd>
        </div>
        <div>
          <dt>Depth</dt>
          <dd>{depth}</dd>
        </div>
        <div>
          <dt>Level</dt>
          <dd>{level}</dd>
        </div>
        <div>
          <dt>Children</dt>
          <dd>{childCount}</dd>
        </div>
        <div>
          <dt>Descendants</dt>
          <dd>{descendantCount}</dd>
        </div>
        <div>
          <dt>Path</dt>
          <dd>{path.map((step) => step.name).join(" / ")}</dd>
        </div>
      </dl>
      {occurrences.length > 1 ? (
        <div className="occurrence-list">
          <p className="detail-note">Other positions of the same entity. Each keeps its own relationship.</p>
          <ul>
            {occurrences.map((occurrence) => (
              <li key={occurrence.id}>
                <button
                  type="button"
                  className={occurrence.id === nodeId ? "text-button is-current" : "text-button"}
                  aria-current={occurrence.id === nodeId ? "true" : undefined}
                  onClick={() => onSelect(occurrence.id)}
                >
                  <code>{occurrence.id}</code>
                  <span>under {occurrence.parentName}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
