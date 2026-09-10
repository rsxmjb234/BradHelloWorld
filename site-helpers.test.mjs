import test from "node:test";
import assert from "node:assert/strict";

import { buildCsv, buildWordExportRtf, escapeRtf } from "./site-helpers.mjs";

test("RTF export includes filter context and only visible transactions", () => {
  const visibleItems = [
    {
      sprl: "Patient Discovery",
      pdr: "Patient Lookup / Patient Resolution",
      requestorChange: "Minor",
      systems: "QE, SPRL, PDR",
      standards: "XCPD → Patient Lookup"
    }
  ];

  const rtf = buildWordExportRtf(visibleItems, "Search filter: Patient Discovery");

  assert.match(rtf, /Filter context: Search filter: Patient Discovery/);
  assert.match(rtf, /Patient Discovery/);
  assert.doesNotMatch(rtf, /Document Retrieve/);
});

test("CSV export includes filter context and guards spreadsheet formulas", () => {
  const visibleItems = [
    {
      sprl: "Quoted \"Value\"",
      pdr: "+Lookup",
      requestorChange: "-Major",
      systems: "@QE",
      standards: "FHIR"
    }
  ];

  const csv = buildCsv(visibleItems, "Search filter: formulas");

  assert.match(csv, /^\uFEFF"Filter Context","Search filter: formulas"/);
  assert.match(csv, /"Quoted ""Value""","'\+Lookup","'-Major","'@QE","FHIR"/);
  assert.doesNotMatch(csv, /Document Discovery/);
});

test("CSV export preserves non-ASCII text for Excel-compatible output", () => {
  const visibleItems = [
    {
      sprl: "Patient Discovery → Retrieve",
      pdr: "Café Repository",
      requestorChange: "Minor",
      systems: "QE",
      standards: "FHIR"
    }
  ];

  const csv = buildCsv(visibleItems, "Search filter: café");

  assert.match(csv, /^\uFEFF/);
  assert.match(csv, /Patient Discovery → Retrieve/);
  assert.match(csv, /Café Repository/);
});

test("RTF escaping preserves non-ASCII characters through UTF-16 code units", () => {
  assert.equal(escapeRtf("😀"), "\\u-10179?\\u-8704?");
  assert.equal(escapeRtf("→"), "\\u8594?");
  assert.equal(escapeRtf("\u9000"), "\\u-28672?");
});
