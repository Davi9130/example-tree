import type { EntityRecord } from "hierarch-tree";
import type { Party } from "../../examples/corporate-structure/types";

export function EntityDetails({ record }: { record: EntityRecord<Party> }) {
  const { data, key } = record;
  return (
    <section className="detail-block" aria-labelledby="entity-heading">
      <h3 id="entity-heading">Entity</h3>
      <p className="detail-note">Central record. Shared by every occurrence of this identity.</p>
      <dl className="defs">
        <div>
          <dt>Name</dt>
          <dd>{data.name}</dd>
        </div>
        <div>
          <dt>Identifier</dt>
          <dd>
            <code>{key}</code>
          </dd>
        </div>
        <div>
          <dt>Document</dt>
          <dd>{data.taxPayer}</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>
            <span className={`badge badge-${data.type.toLowerCase()}`}>{data.type}</span>
          </dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{data.status}</dd>
        </div>
        <div>
          <dt>Active</dt>
          <dd>{data.active ? "true" : "false"}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{data.email ?? "—"}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{data.phone ?? "—"}</dd>
        </div>
        <div>
          <dt>Tags</dt>
          <dd>{data.tags.join(", ")}</dd>
        </div>
        <div>
          <dt>Address</dt>
          <dd>{data.address ? `${data.address.city}, ${data.address.state}` : "—"}</dd>
        </div>
        <div>
          <dt>Founded</dt>
          <dd>{data.foundedAt ? <time dateTime={data.foundedAt}>{data.foundedAt}</time> : "—"}</dd>
        </div>
      </dl>
    </section>
  );
}
