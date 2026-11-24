export function CoreConcepts() {
  return (
    <section className="section wrap" id="concepts" aria-labelledby="concepts-heading">
      <h2 id="concepts-heading">Core concepts</h2>
      <p className="section-lead">Three records, kept apart. The registry holds the entity. The structure holds occurrences. The relationship lives on the occurrence.</p>
      <ol className="diagram" aria-label="Entity, structure node and relationship">
        <li>
          <strong>Entity</strong>
          <span>EntityRecord</span>
          <p>The central registration. One identity, one record, even when the structure cites it more than once.</p>
        </li>
        <li className="diagram-link" aria-hidden="true">
          occurrence
        </li>
        <li>
          <strong>Structure node</strong>
          <span>StructureNode</span>
          <p>One position in the hierarchy. It has its own id, a parent, children, and a key back to the entity.</p>
        </li>
        <li className="diagram-link" aria-hidden="true">
          stores
        </li>
        <li>
          <strong>Relationship</strong>
          <span>node.relationship</span>
          <p>Facts about that link only: percentage, role, dates, metadata. Updating it does not change the entity.</p>
        </li>
      </ol>
      <div className="concept-grid">
        <article className="card">
          <h3>Entity</h3>
          <p>Represents the central registration of an entity. The same record can back several occurrences.</p>
        </article>
        <article className="card">
          <h3>Structure node</h3>
          <p>Represents one occurrence of the entity inside the hierarchy. Each occurrence has its own identifier.</p>
        </article>
        <article className="card">
          <h3>Relationship</h3>
          <p>Represents the data of the link between a child occurrence and its parent: share, role, dates and custom metadata.</p>
        </article>
      </div>
    </section>
  );
}
