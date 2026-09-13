/**
 * One-click Sealmetrics report in Data Studio (Looker Studio Linking API).
 *
 * The link copies the template report "Sealmetrics - Informe" for whoever opens
 * it; Data Studio then asks for their Sealmetrics API key once. Source of truth
 * for the template, deployment and aliases: sealmetrics2
 * `integrations/looker-studio/CLAUDE.md` → "One-click report". If a data source
 * is added to the template there, add its alias here.
 */

const TEMPLATE_REPORT_ID = "c4473a50-da65-465a-8eee-70ec46662a73";
const CONNECTOR_DEPLOYMENT_ID =
  "AKfycbyY77pGf0j2jWwMmjmkwTZmnVh3wBkYo_YXGy2Kmqm7PDSoykBGhK-Gi2nknAwB1z0LRQ";

// Template data source alias → connector report type.
const DATA_SOURCES: Record<string, string> = {
  ds0: "pages",
  ds1: "channels",
  ds3: "traffic_overview",
  ds4: "traffic_sources",
  ds5: "landing_pages",
  ds6: "countries",
  ds7: "devices",
};

function buildReportUrl(): string {
  const params = new URLSearchParams({
    "c.reportId": TEMPLATE_REPORT_ID,
    "r.reportName": "Sealmetrics",
  });
  for (const [alias, reportType] of Object.entries(DATA_SOURCES)) {
    params.set(`ds.${alias}.connector`, "community");
    params.set(`ds.${alias}.connectorId`, CONNECTOR_DEPLOYMENT_ID);
    params.set(`ds.${alias}.reportType`, reportType);
    params.set(`ds.${alias}.keepDatasourceName`, "true");
  }
  return `https://datastudio.google.com/reporting/create?${params.toString()}`;
}

export const DATA_STUDIO_REPORT_URL = buildReportUrl();
