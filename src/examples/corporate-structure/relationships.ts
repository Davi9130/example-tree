import type { Shareholding } from "./types";

function link(
  percentage: number,
  role: string,
  startedAt: string,
  note: string,
  endedAt: string | null = null,
): Shareholding {
  return { percentage, role, startedAt, endedAt, approved: true, metadata: { note } };
}

/** Stored on the root occurrence. Rules do not evaluate a root, because it has no parent. */
export const alfaRoot = link(100, "holding", "2012-03-01", "Root occurrence of the holding.");

export const betaUnderAlfa = link(55, "controlled company", "2016-02-11", "Controlling stake held by Alfa.");

export const carlosUnderAlfa = link(45, "shareholder", "2016-02-11", "Direct individual stake in Alfa.");

export const gammaUnderBeta = link(70, "controlled company", "2018-04-03", "Beta controls Gamma.");

export const anaUnderBeta = link(30, "quota holder", "2019-08-20", "Individual quota in Beta.");

export const carlosUnderGamma = link(25, "director", "2021-01-15", "Same person, different link and role.");

export const deltaUnderGamma = link(45, "investee", "2021-06-01", "Gamma holds Delta.");

export const brunoUnderGamma = link(30, "quota holder", "2022-03-18", "Individual quota in Gamma.");
