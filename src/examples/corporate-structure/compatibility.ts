import type { EntityStructure } from "hierarch-tree";
import { alfa, carlos } from "./entities";
import type { Party, Shareholding } from "./types";

export const entityKinds = ["PF", "PJ"] as const;
export type EntityKind = (typeof entityKinds)[number];

export interface CompatibilityCell {
  readonly parent: EntityKind;
  readonly child: EntityKind;
  readonly allowed: boolean;
}

/** Asks the library which parent/child pairs the configured rules allow. */
export function compatibility(structure: EntityStructure<Party, Shareholding>): readonly CompatibilityCell[] {
  const sample: Record<EntityKind, Party> = { PF: carlos, PJ: alfa };
  return entityKinds.flatMap((parent) =>
    entityKinds.map((child) => ({
      parent,
      child,
      allowed: structure.canRelate(sample[parent], sample[child]),
    })),
  );
}
