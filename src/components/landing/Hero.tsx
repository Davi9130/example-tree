import { useState } from "react";
import { corporateDemo } from "../../examples/corporate-structure/structure";
import { githubUrl, installCommand, libraryVersion, npmUrl } from "../../lib/meta";

export function Hero() {
  const [root] = corporateDemo.structure.toTree();

  return (
    <section className="hero wrap" id="top">
      <div className="hero-copy">
        <p className="kicker">
          {libraryVersion} · TypeScript
        </p>
        <h1>Build complex entity structures with confidence.</h1>
        <p className="lede">A flexible TypeScript engine for hierarchical entities, relationships and configurable business rules.</p>
        <p className="prose">
          Build, validate and manage complex multi-level structures without coupling your business logic to a specific domain or UI
          framework.
        </p>
        <div className="actions">
          <a className="btn btn-primary" href="#developer-experience">
            Get Started
          </a>
          <a className="btn btn-secondary" href="#example">
            Explore Example
          </a>
          <a className="btn btn-ghost" href={npmUrl}>
            View on npm
          </a>
        </div>
        <InstallCommand />
      </div>
      {root ? (
        <figure className="mini">
          <figcaption>toTree() · first two levels</figcaption>
          <div className="mini-root">
            <span className="node-name">{root.entity.name}</span>
            <span className={`badge badge-${root.entity.type.toLowerCase()}`}>{root.entity.type}</span>
          </div>
          <ul className="mini-children">
            {root.children.map((child) => (
              <li key={child.id}>
                <span className="node-name">{child.entity.name}</span>
                <span className={`badge badge-${child.entity.type.toLowerCase()}`}>{child.entity.type}</span>
                <span className="node-share">{child.relationship.percentage}%</span>
                {child.children.length > 0 ? (
                  <span className="mini-more">
                    {child.children.length} {child.children.length === 1 ? "child" : "children"}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <a className="mini-link" href={githubUrl}>
            {githubUrl.replace(/^https:\/\//, "")}
          </a>
        </figure>
      ) : null}
    </section>
  );
}

function InstallCommand() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="install">
      <code>{installCommand}</code>
      <button
        type="button"
        onClick={() => {
          void navigator.clipboard.writeText(installCommand).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          });
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
