/** Consumer domain. None of these fields exist in the hierarch-tree core. */
export interface Party {
  readonly taxPayer: string;
  readonly type: "PF" | "PJ";
  readonly name: string;
  readonly status: "active" | "inactive";
  readonly email: string | null;
  readonly phone: string | null;
  readonly active: boolean;
  readonly tags: readonly string[];
  readonly address: { readonly city: string; readonly state: string } | null;
  /** ISO date string supplied by the consumer. The core does not type dates. */
  readonly foundedAt: string | null;
}

/** Data that belongs to one occurrence, never to the central entity. */
export interface Shareholding {
  readonly percentage: number;
  readonly role: string;
  readonly startedAt: string;
  readonly endedAt: string | null;
  readonly approved: boolean;
  readonly metadata: { readonly note: string };
}
