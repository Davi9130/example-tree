import rulesSource from "../../examples/corporate-structure/rules.ts?raw";
import { compatibility } from "../../examples/corporate-structure/compatibility";
import { corporateDemo } from "../../examples/corporate-structure/structure";
import { CodeExample } from "../code/CodeExample";

export function RelationshipRules() {
  const cells = compatibility(corporateDemo.structure);
  const allowed = (parent: "PF" | "PJ", child: "PF" | "PJ") =>
    cells.find((cell) => cell.parent === parent && cell.child === child)?.allowed === true;

  return (
    <section className="section wrap" id="rules" aria-labelledby="rules-heading">
      <h2 id="rules-heading">Configurable rules</h2>
      <p className="section-lead">
        PF and PJ are values used by this example. They are not concepts built into the core. The matrix below is the result of{" "}
        <code>canRelate</code>, not a static table.
      </p>
      <div className="split">
        <CodeExample code={rulesSource} filename="rules.ts" />
        <div className="panel">
          <table className="matrix">
            <caption>Parent and child compatibility</caption>
            <thead>
              <tr>
                <th scope="col">Parent</th>
                <th scope="col">Child PF</th>
                <th scope="col">Child PJ</th>
              </tr>
            </thead>
            <tbody>
              {(["PF", "PJ"] as const).map((parent) => (
                <tr key={parent}>
                  <th scope="row">{parent}</th>
                  <td>
                    <Result allowed={allowed(parent, "PF")} />
                  </td>
                  <td>
                    <Result allowed={allowed(parent, "PJ")} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="detail-note">
            Mode is restrictive: a link that matches no allow rule is rejected. A PF parent matches the deny rule for every child, so
            canRelate returns false for both PF → PF and PF → PJ.
          </p>
        </div>
      </div>
    </section>
  );
}

function Result({ allowed }: { allowed: boolean }) {
  return <span className={allowed ? "pill pill-ok" : "pill pill-no"}>{allowed ? "Allowed" : "Blocked"}</span>;
}
