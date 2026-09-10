export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

export function safeDelimitedCell(value) {
  const text = /^[=+\-@]/.test(String(value)) ? `'${String(value)}` : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function escapeRtf(value) {
  return Array.from(String(value))
    .map((character) => {
      if (character === "\\") return "\\\\";
      if (character === "{") return "\\{";
      if (character === "}") return "\\}";
      if (character === "\n") return "\\par ";
      const codePoint = character.codePointAt(0);
      return codePoint > 127 ? `\\u${codePoint}?` : character;
    })
    .join("");
}

export function buildWordExportRtf(items, filterText) {
  const widths = [2200, 4400, 6200, 10200, 12800];
  const buildRow = (cells, bold = false) => {
    const prefix = bold ? "\\b " : "";
    const suffix = bold ? "\\b0 " : "";
    const cellDefinitions = widths.map((width) => `\\cellx${width}`).join("");
    const body = cells
      .map((cell) => `\\intbl ${prefix}${escapeRtf(cell)}${suffix}\\cell`)
      .join("");
    return `\\trowd\\trgaph108${cellDefinitions}${body}\\row\\pard\\par`;
  };

  const headerRow = buildRow(
    ["SPRL Transaction", "PDR Equivalent", "Requestor Change", "Systems", "Standards"],
    true
  );
  const rows = items
    .map((item) => buildRow([item.sprl, item.pdr, item.requestorChange, item.systems, item.standards]))
    .join("");

  return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}\\fs22\\b QE Migration Journey: SPRL to PDR\\b0\\par\\par A side-by-side comparison of the patient discovery, document discovery, and document retrieval journey for CCD access.\\par Filter context: ${escapeRtf(filterText)}\\par\\par ${headerRow}${rows}\\par}`;
}

export function buildCsv(items, filterText) {
  const rows = [
    ["Filter Context", filterText],
    [],
    ["SPRL Transaction", "PDR Equivalent", "Requestor Change", "Systems", "Standards"],
    ...items.map((item) => [item.sprl, item.pdr, item.requestorChange, item.systems, item.standards])
  ];

  return rows.map((row) => row.map(safeDelimitedCell).join(",")).join("\n");
}
