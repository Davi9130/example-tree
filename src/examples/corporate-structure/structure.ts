import { createEntityStructure, type AddNodeInput, type EntityStructure } from "hierarch-tree";
import { alfa, ana, beta, bruno, carlos, delta, gamma } from "./entities";
import {
  alfaRoot,
  anaUnderBeta,
  betaUnderAlfa,
  brunoUnderGamma,
  carlosUnderAlfa,
  carlosUnderGamma,
  deltaUnderGamma,
  gammaUnderBeta,
} from "./relationships";
import { percentageLimit, relationshipRules } from "./rules";
import type { Party, Shareholding } from "./types";

export interface DemoNodes {
  readonly alfa: string;
  readonly beta: string;
  readonly carlosAtAlfa: string;
  readonly gamma: string;
  readonly carlosAtGamma: string;
  readonly delta: string;
  readonly bruno: string;
  readonly ana: string;
}

export interface CorporateDemo {
  readonly structure: EntityStructure<Party, Shareholding>;
  readonly nodes: DemoNodes;
}

function sequentialIds(prefix: string): () => string {
  let count = 0;
  return () => {
    count += 1;
    return `${prefix}${count}`;
  };
}

function add(structure: EntityStructure<Party, Shareholding>, input: AddNodeInput<Party, Shareholding>) {
  const result = structure.addNode(input);
  if (!result.ok) {
    throw new Error(result.errors.map((error) => `${error.code}: ${error.message}`).join("\n"));
  }
  return result.value;
}

/**
 * Builds the fictional four-level shareholding with the public API.
 * Carlos Mendes is registered once and linked from two parents.
 * A natural person cannot have children, so every PF occurrence is a leaf.
 */
export function buildCorporateDemo(): CorporateDemo {
  const structure = createEntityStructure<Party, Shareholding>({
    identity: {
      key: "taxPayer",
      normalize: (value) => value.replace(/\D/g, ""),
    },
    relationships: {
      mode: "restrictive",
      rules: relationshipRules,
    },
    validators: [percentageLimit],
    createId: sequentialIds("node-"),
  });

  const alfaNode = add(structure, { entity: alfa, relationship: alfaRoot });
  const betaNode = add(structure, { entity: beta, parentId: alfaNode.nodeId, relationship: betaUnderAlfa });
  const carlosAtAlfa = add(structure, {
    entity: carlos,
    parentId: alfaNode.nodeId,
    relationship: carlosUnderAlfa,
  });
  const gammaNode = add(structure, { entity: gamma, parentId: betaNode.nodeId, relationship: gammaUnderBeta });
  const carlosAtGamma = add(structure, {
    entityKey: carlosAtAlfa.entityKey,
    parentId: gammaNode.nodeId,
    relationship: carlosUnderGamma,
  });
  const deltaNode = add(structure, { entity: delta, parentId: gammaNode.nodeId, relationship: deltaUnderGamma });
  const brunoNode = add(structure, { entity: bruno, parentId: gammaNode.nodeId, relationship: brunoUnderGamma });
  const anaNode = add(structure, { entity: ana, parentId: betaNode.nodeId, relationship: anaUnderBeta });

  const validation = structure.validateStructure();
  if (!validation.valid) {
    throw new Error(validation.errors.map((error) => `${error.code}: ${error.message}`).join("\n"));
  }

  return {
    structure,
    nodes: {
      alfa: alfaNode.nodeId,
      beta: betaNode.nodeId,
      carlosAtAlfa: carlosAtAlfa.nodeId,
      gamma: gammaNode.nodeId,
      carlosAtGamma: carlosAtGamma.nodeId,
      delta: deltaNode.nodeId,
      bruno: brunoNode.nodeId,
      ana: anaNode.nodeId,
    },
  };
}

export const corporateDemo = buildCorporateDemo();
