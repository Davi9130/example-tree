import { describe, expect, it } from "vitest";
import { compatibility } from "./compatibility";
import { carlos } from "./entities";
import { corporateDemo } from "./structure";

describe("corporate demo", () => {
  const { structure, nodes } = corporateDemo;

  it("validates a four-level structure with one shared identity", () => {
    expect(structure.validateStructure().valid).toBe(true);
    expect(structure.getAllEntities()).toHaveLength(7);
    expect(Object.keys(structure.getState().nodes)).toHaveLength(8);

    expect(structure.getDepth(nodes.alfa)).toBe(0);
    expect(structure.getDepth(nodes.carlosAtGamma)).toBe(3);

    const carlosRecord = structure.findByIdentity(carlos.taxPayer);
    expect(carlosRecord?.data.name).toBe("Carlos Mendes");
    const occurrences = structure.getOccurrences(carlosRecord?.key ?? "");
    expect(occurrences.map((node) => node.id)).toEqual([nodes.carlosAtGamma, nodes.carlosAtAlfa]);
    expect(new Set(occurrences.map((node) => node.entityKey)).size).toBe(1);
    expect(structure.findByNodeId(nodes.carlosAtAlfa)?.relationship.role).toBe("shareholder");
    expect(structure.findByNodeId(nodes.carlosAtGamma)?.relationship.role).toBe("director");
    expect(structure.findByNodeId(nodes.carlosAtAlfa)?.relationship.percentage).toBe(45);
    expect(structure.findByNodeId(nodes.carlosAtGamma)?.relationship.percentage).toBe(25);

    const gammaParent = structure.getParent(nodes.gamma);
    expect(structure.findEntity(gammaParent?.entityKey ?? "")?.data.type).toBe("PJ");
    expect(structure.findEntity(structure.findByNodeId(nodes.gamma)?.entityKey ?? "")?.data.type).toBe("PJ");

    const anaParent = structure.getParent(nodes.ana);
    expect(structure.findEntity(anaParent?.entityKey ?? "")?.data.type).toBe("PJ");
    expect(structure.findEntity(structure.findByNodeId(nodes.ana)?.entityKey ?? "")?.data.type).toBe("PF");

    expect(structure.getChildren(nodes.carlosAtAlfa)).toEqual([]);
    expect(structure.getChildren(nodes.carlosAtGamma)).toEqual([]);
    expect(structure.getDescendants(nodes.carlosAtAlfa)).toEqual([]);
    expect(structure.getDescendants(nodes.carlosAtGamma)).toEqual([]);
    expect(structure.toTree()).toHaveLength(1);
  });

  it("blocks a person from having any child and allows companies to hold both kinds", () => {
    const cells = compatibility(structure);
    const allowed = (parent: "PF" | "PJ", child: "PF" | "PJ") =>
      cells.find((cell) => cell.parent === parent && cell.child === child)?.allowed;

    expect(allowed("PJ", "PF")).toBe(true);
    expect(allowed("PJ", "PJ")).toBe(true);
    expect(allowed("PF", "PF")).toBe(false);
    expect(allowed("PF", "PJ")).toBe(false);
    const alfa = structure.findEntity(structure.findByNodeId(nodes.alfa)?.entityKey ?? "");
    expect(alfa).toBeDefined();
    expect(structure.canRelate(carlos, alfa!.data)).toBe(false);
  });
});
