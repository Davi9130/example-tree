import type { RelationshipRule, StructureValidator } from "hierarch-tree";
import type { Party, Shareholding } from "./types";

/** The children's percentages of one occurrence cannot exceed 100%. */
export const percentageLimit: StructureValidator<Party, Shareholding> = ({ children }) => {
  const total = children.reduce((sum, child) => sum + child.relationship.percentage, 0);
  return total > 100
    ? {
        valid: false,
        code: "PERCENTAGE_EXCEEDED",
        message: `Shares add up to ${total}%.`,
        details: { total },
      }
    : { valid: true };
};

/**
 * PF and PJ are values of the consumer's `type` field. The core matches them
 * with `===` and does not know what they mean.
 */
export const relationshipRules: readonly RelationshipRule<Party, Shareholding>[] = [
  { id: "pj-has-pf", parent: { type: "PJ" }, child: { type: "PF" }, allowed: true },
  { id: "pj-has-pj", parent: { type: "PJ" }, child: { type: "PJ" }, allowed: true },
  {
    id: "pf-cannot-have-children",
    parent: { type: "PF" },
    allowed: false,
    code: "PF_CANNOT_HAVE_CHILDREN",
    message: "A natural person cannot have children in this structure.",
  },
];
