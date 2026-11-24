import rulesSource from "../../examples/corporate-structure/rules.ts?raw";
import structureSource from "../../examples/corporate-structure/structure.ts?raw";
import { installCommand } from "../../lib/meta";
import { CodeExample } from "../code/CodeExample";

export function DeveloperExperience() {
  return (
    <section className="section wrap" id="developer-experience" aria-labelledby="dx-heading">
      <h2 id="dx-heading">Developer experience</h2>
      <p className="section-lead">
        The sample that runs this page: identity, rules, <code>createEntityStructure</code>, <code>addNode</code>, a second occurrence by{" "}
        <code>entityKey</code>, then <code>validateStructure</code>.
      </p>
      <div className="install install-block">
        <code>{installCommand}</code>
      </div>
      <div className="stack">
        <CodeExample code={rulesSource} filename="src/examples/corporate-structure/rules.ts" />
        <CodeExample code={structureSource} filename="src/examples/corporate-structure/structure.ts" />
      </div>
    </section>
  );
}
