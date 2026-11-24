import { docsBase, githubUrl } from "./meta";

export interface DocLink {
  readonly title: string;
  readonly href: string;
  readonly description: string;
}

/** Links that exist in the hierarch-tree repository. */
export const documentation: readonly DocLink[] = [
  {
    title: "Getting Started",
    href: `${docsBase}/README.md`,
    description: "Install the package and create a structure.",
  },
  {
    title: "Core Concepts",
    href: `${docsBase}/docs/architecture.md`,
    description: "Identity, occurrences and the normalized state.",
  },
  {
    title: "Identity Management",
    href: `${docsBase}/docs/api-reference.md#configuração`,
    description: "Identify entities by a property or a function, with normalization.",
  },
  {
    title: "Structure Management",
    href: `${docsBase}/docs/api-reference.md#operações-puras`,
    description: "addNode, moveNode, removeNode and updateRelationship.",
  },
  {
    title: "Relationship Rules",
    href: `${docsBase}/docs/relationship-rules.md`,
    description: "Declarative matchers. Deny wins over allow.",
  },
  {
    title: "Validation",
    href: `${docsBase}/docs/api-reference.md#regras-e-validação`,
    description: "validateStructure, consumer validators and atomic failures.",
  },
  {
    title: "Search & Navigation",
    href: `${docsBase}/docs/api-reference.md#consultas`,
    description: "Paths, depth, descendants, occurrences and toTree.",
  },
  {
    title: "Import & Export",
    href: `${docsBase}/docs/api-reference.md#serialização-exportstructure--importstructure`,
    description: "Versioned snapshots with exportStructure and importStructure.",
  },
  {
    title: "API Reference",
    href: `${docsBase}/docs/api-reference.md`,
    description: "The public core API.",
  },
];

export const adapterDocs: readonly DocLink[] = [
  {
    title: "Zod",
    href: `${docsBase}/docs/zod.md`,
    description: "hierarch-tree/zod",
  },
  {
    title: "Zustand",
    href: `${docsBase}/docs/zustand.md`,
    description: "hierarch-tree/zustand",
  },
  {
    title: "React Hook Form",
    href: `${docsBase}/docs/react-hook-form.md`,
    description: "hierarch-tree/react-hook-form",
  },
  {
    title: "Examples",
    href: `${docsBase}/docs/examples.md`,
    description: "PF/PJ configuration shipped with the repository.",
  },
];

export const repositoryUrl = githubUrl;
