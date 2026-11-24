import { corporateDemo } from "../../examples/corporate-structure/structure";

export function DataTypes() {
  const { structure, nodes } = corporateDemo;
  const alfa = structure.findEntity(structure.findByNodeId(nodes.alfa)?.entityKey ?? "");
  const beta = structure.findByNodeId(nodes.beta);
  if (!alfa || !beta) return null;

  const rows = [
    { type: "String", example: "Name, email", value: alfa.data.name },
    { type: "Number", example: "Percentage, revenue", value: String(beta.relationship.percentage) },
    { type: "Boolean", example: "Active, approved", value: String(alfa.data.active) },
    { type: "Null", example: "Phone not provided", value: alfa.data.phone === null ? "null" : String(alfa.data.phone) },
    { type: "Array", example: "Tags, documents", value: JSON.stringify(alfa.data.tags) },
    { type: "Object", example: "Address, contact", value: JSON.stringify(alfa.data.address) },
    { type: "Enum", example: "PF, PJ, tax regime", value: alfa.data.type },
    { type: "Date", example: "Founded, link start", value: alfa.data.foundedAt ?? "—" },
    { type: "JSON", example: "Custom metadata", value: JSON.stringify(beta.relationship.metadata) },
  ];

  return (
    <section className="section wrap" id="data-types" aria-labelledby="types-heading">
      <h2 id="types-heading">Data types</h2>
      <p className="section-lead">
        The library keeps the values you pass. It does not impose a domain schema. Dates here are ISO strings on the consumer types, because the core has no date type of its own. The row values are Alfa's registration and Beta's relationship, read back from the structure.
      </p>
      <div className="table-scroll">
        <table className="type-table">
          <caption>Values preserved on the demo structure</caption>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Example</th>
              <th scope="col">Stored value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.type}>
                <th scope="row">{row.type}</th>
                <td>{row.example}</td>
                <td>
                  <code>{row.value}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
