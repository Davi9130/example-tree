import { adapterDocs, documentation } from "../../lib/docs";

export function Documentation() {
  return (
    <section className="section wrap" id="docs" aria-labelledby="docs-heading">
      <h2 id="docs-heading">Documentation</h2>
      <p className="section-lead">These links open the markdown that ships in the repository.</p>
      <ul className="doc-list">
        {documentation.map((doc) => (
          <li key={doc.href}>
            <a className="card doc-card" href={doc.href}>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
            </a>
          </li>
        ))}
      </ul>
      <h3 className="subhead">Optional adapters</h3>
      <ul className="adapter-list">
        {adapterDocs.map((doc) => (
          <li key={doc.href}>
            <a href={doc.href}>
              {doc.title}
              <span>{doc.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
