# VietLens

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23616610.svg)](https://doi.org/10.5281/zenodo.23616610)

**VietLens: a provenance-first Vietnam business-data product (MVP)**

Phan Anh Tu ([ORCID 0000-0003-0667-3137](https://orcid.org/0000-0003-0667-3137); patu@ctu.edu.vn) and Do Thuy Huong ([ORCID 0000-0002-7711-2487](https://orcid.org/0000-0002-7711-2487); thuyhuongctu@gmail.com)
School of Economics, Can Tho University, Vietnam

**Live app:** <https://vietlens.jemappellehuong.com/>

Status: **MVP preview (v1.0.0)**. Internal, not yet public. Most cards are sample/proxy data; the Tier 1 official layer holds real public series (see below).

Quarterly, source-first indicators for the Mekong Delta and Vietnam: every figure carries its source, period, collection method and stated limitation.

## Repository status

VietLens was prototyped inside the BizOn ecosystem (https://github.com/thuyhuongctu/BizOn, DOI [10.5281/zenodo.21592241](https://doi.org/10.5281/zenodo.21592241)) and moved here in October 2026 with its own release history.

VietLens remains a separate product identity from BizOn and M-AIDA. This repository must not be treated as permission to reuse restricted M-AIDA code, data, credentials or research materials. The production/commercial implementation should use a separate repository, database, API configuration and provenance ledger.

## Contents

| Path | Role |
|---|---|
| `index.html`, `styles.css`, `css/clay-vietlens-skin.css` | The dashboard (static, no build step) |
| `app.js`, `sample-data.js` | Pulse composite, signals, scenario ensemble and shock simulator on the sample/proxy dataset |
| `official.js`, `official-data.js`, `data/official.json` | Tier 1 official data layer |
| `data/raw/` | Public source files for the Tier 1 layer |
| `tools/build_official.py` | Rebuilds the Tier 1 layer from `data/raw/` |
| `js/bizon-lang.js`, `js/capture-guard.js`, `css/bizon-clay-fonts.css`, `assets/` | Shared with BizOn: language default, capture deterrent, icon and self-hosted fonts (SIL Open Font License, `assets/fonts/OFL.txt`) |
| `docs/OPERATING-MECHANISM-V1.md` | Current runtime and target production mechanism |
| `test/` | Smoke and Tier 1 data tests (`npm test`) |

The public introduction page stays on the BizOn site: https://bizonland.com/vietlens/gioi-thieu.html

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

No build step, API key or backend is required.

## Tests

```bash
npm test
```

## Positioning: depth and provenance, not velocity

VietLens deliberately inverts the real-time "monitor" model. Its value is **structural depth with verifiable origin**, on a **quarterly** cadence, for a narrow-and-deep scope (Vietnam and the Mekong Delta). What Vietnamese users lack is not numbers but **numbers with a checkable origin** — so the source-and-period label *is* the product, not a technical detail.

**One-line rule: no provenance, no board.** A single unsourced indicator undermines the credibility of a hundred sourced ones — `app.js` filters out any indicator missing a `source`.

### Scope discipline

- **In scope:** provincial/regional economic indicators (quarterly), core agri value chains (rice, shrimp, pangasius, fruit), trade by product & market, FDI by province & sector, provincial institutional environment. Each indicator carries source, period, method and limitation.
- **Out of scope (even when tempting):** real-time news, minute-level prices, unreviewed model-generated forecasts, and any indicator that cannot name its source.

### Three-tier build (gate discipline)

1. **Tier 1 — data layer, no UI.** Structured indicators with provenance, exported as JSON. This is infrastructure the two game pillars already depend on, and evidence the research needs — *not* a third product.
2. **Tier 2 — read dashboard.** Free, no sign-up. Ships after the two pillars pass their commercialization gate.
3. **Tier 3 — API & paid tiers.** Only after Tier 2 has real users and per-source redistribution rights are cleared.

## Current capabilities (preview)

- Vietnam Pulse composite.
- Provenance-first indicators: trade-by-commodity, rice & shrimp value chains, retail demand, FDI, provincial institution (PCI), quarterly FX, logistics and energy cost indices — each with source, period, method and limitation.
- Regional risk schematic.
- Quarterly Signal Room with confidence, source count and data period.
- 90-day scenario ensemble (labelled MVP; not investment advice).
- Shock simulator for energy, FX, logistics and export demand.
- Source ledger with status, lag and **redistribution-rights** column.
- Downloadable JSON report.

## Tier 1 — official data layer (started 10/2026)

`data/official.json` (machine-readable) and `official-data.js` (browser) hold **real public series**, built by `python3 tools/build_official.py` from the source files in `data/raw/`:

| Series | Source | Period |
|---|---|---|
| FDI disbursed, national, quarterly | General Statistics Office quarterly reports (each point with URL and verbatim quote) | 2012Q1–2026Q2 |
| FDI newly registered, quarterly | same (cut-off date changes flagged) | 2012Q1–2026Q2 |
| Cumulative registered FDI by partner | GSO Statistical Yearbooks 2008 and 2012 | end-2008, end-2012 |
| World import volume | CPB World Trade Monitor (Jul 2026 release) | 2011Q1–2026Q2 |
| Real effective exchange rate of the dong | Bruegel REER database (Darvas, 2021), 120 partners | 2011Q1–2026Q2 |
| Durian exports | Ministry of Industry and Trade reports; CESTI (04/2024) | 2022–Feb 2024 |

The purchased Customs FDI-sector series is **not** included until its redistribution licence is confirmed. `test/official.test.js` checks provenance completeness, rebuild reproducibility and the exclusion of purchased data. Other cards, map, signals and scenarios remain sample/proxy.

## Important limitation

The current data are transparent sample/proxy observations designed to validate product architecture and user experience. They are **not live official feeds** and the forecast equations are **not calibrated predictive models**.

The interface deliberately labels:

- source type;
- freshness;
- confidence;
- official versus proxy status;
- model version;
- data gaps;
- limitations.

## Next implementation phase

1. ~~Move VietLens into its own repository and release history~~ (done, 10/2026).
2. Add server-side source adapters for official/permitted Vietnamese sources.
3. Store observations in a separate PostgreSQL/TimescaleDB instance.
4. Add source health, retries, stale-on-error and provenance hashes.
5. Establish naïve forecast baselines and rolling backtests.
6. Publish forecast audit metrics before advertising predictive accuracy.
7. Add Mekong weather–agriculture module.
8. Create API contracts and commercial alert subscriptions.
9. Produce a clean-room compliance report, SBOM and data-rights register.

## Proposed architecture

```text
Official and permitted public sources
        ↓
Source adapters and provenance
        ↓
Observation store
        ↓
Signal fusion and anomaly detection
        ↓
Forecast registry and scenario engine
        ↓
Dashboard, alerts and forecast audit
```

## Safety and positioning

VietLens should be described as a **depth-and-provenance Vietnam business-data product** (with an MVP conditional-scenario lab), not as a real-time monitor or a system that predicts everything with certainty. It must not be used as the sole basis for financial, medical, legal, emergency or public-policy decisions.

**Biggest operational risk — redistribution rights.** Many statistical sources allow viewing but restrict redistribution, especially over an API or paid tier. Per-source terms must be checked *before* an indicator enters the board, not after a customer appears. Maintenance is a permanent commitment: even a quarterly cadence is four releases a year, forever, and needs a named owner.

## Citation

Phan, A. T., & Do, T. H. (2026). *VietLens: A provenance-first Vietnam business-data product (MVP)* (Version 1.0.0) [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.23616611

Cite the version DOI for the exact release used. The concept DOI [10.5281/zenodo.23616610](https://doi.org/10.5281/zenodo.23616610) covers all versions and resolves to the latest. `CITATION.cff` holds the metadata.

## Licence

Proprietary; all rights reserved. See `LICENSE`. © 2026 Phan Anh Tu & Do Thuy Huong. Third-party data in `data/raw/` remain subject to their sources' terms.
