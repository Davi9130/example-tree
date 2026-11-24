import type { ReactNode } from "react";

interface Token {
  readonly kind: "plain" | "comment" | "string" | "number" | "keyword";
  readonly text: string;
}

const keywords = new Set([
  "import",
  "from",
  "export",
  "const",
  "let",
  "function",
  "return",
  "type",
  "interface",
  "true",
  "false",
  "null",
  "as",
  "if",
  "new",
  "readonly",
]);

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  while (index < code.length) {
    if (code.startsWith("//", index)) {
      const end = code.indexOf("\n", index);
      const stop = end === -1 ? code.length : end;
      tokens.push({ kind: "comment", text: code.slice(index, stop) });
      index = stop;
      continue;
    }

    const quote = code[index];
    if (quote === '"' || quote === "'" || quote === "`") {
      let cursor = index + 1;
      while (cursor < code.length && code[cursor] !== quote) {
        cursor += code[cursor] === "\\" ? 2 : 1;
      }
      tokens.push({ kind: "string", text: code.slice(index, Math.min(cursor + 1, code.length)) });
      index = cursor + 1;
      continue;
    }

    const current = code[index] ?? "";
    const previous = code[index - 1] ?? "";
    if (/\d/.test(current) && !/\w/.test(previous)) {
      let cursor = index + 1;
      while (cursor < code.length && /[\d.]/.test(code[cursor] ?? "")) cursor += 1;
      tokens.push({ kind: "number", text: code.slice(index, cursor) });
      index = cursor;
      continue;
    }

    if (/[A-Za-z_$]/.test(current)) {
      let cursor = index + 1;
      while (cursor < code.length && /\w/.test(code[cursor] ?? "")) cursor += 1;
      const text = code.slice(index, cursor);
      tokens.push({ kind: keywords.has(text) ? "keyword" : "plain", text });
      index = cursor;
      continue;
    }

    tokens.push({ kind: "plain", text: current });
    index += 1;
  }

  return tokens;
}

function Highlighted({ code }: { code: string }) {
  const nodes: ReactNode[] = tokenize(code).map((token, index) =>
    token.kind === "plain" ? (
      <span key={index}>{token.text}</span>
    ) : (
      <span key={index} className={`tok-${token.kind}`}>
        {token.text}
      </span>
    ),
  );
  return <>{nodes}</>;
}

export function CodeExample({ code, filename }: { code: string; filename: string }) {
  return (
    <figure className="code">
      <figcaption>
        <span>{filename}</span>
        <span className="code-lang">ts</span>
      </figcaption>
      <pre>
        <code>
          <Highlighted code={code} />
        </code>
      </pre>
    </figure>
  );
}
