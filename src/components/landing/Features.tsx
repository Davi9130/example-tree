const features = [
  {
    title: "Generic by Design",
    body: "The core has no companies, people, products or categories. PF and PJ in this page are fields on the consumer's entity.",
  },
  {
    title: "Configurable Identity",
    body: "Pick a property, such as a document number, or pass getKey. An optional normalize function turns the raw value into the entity key.",
  },
  {
    title: "Relationship Rules",
    body: "Declare which entities may be linked, or reject a pair with a custom code. A predicate can still run on every link.",
  },
  {
    title: "Multi-level Structures",
    body: "Occurrences nest recursively. Depth, path, ancestors and descendants are queries over that tree, not a second model.",
  },
  {
    title: "Entity Reusability",
    body: "The same identity can show up under different parents. Each position is a new occurrence with its own relationship.",
  },
  {
    title: "Framework Friendly",
    body: "The core has no UI dependency. Optional adapters exist for Zod, Zustand and React Hook Form, imported from their own entry points.",
  },
];

export function Features() {
  return (
    <section className="section wrap" id="why" aria-labelledby="why-heading">
      <h2 id="why-heading">Why HierarchTree?</h2>
      <ul className="feature-grid">
        {features.map((feature) => (
          <li key={feature.title} className="card">
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
