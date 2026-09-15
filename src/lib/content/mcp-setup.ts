import type { HowToStep } from "@/components/ui/HowToSteps";

/**
 * How to connect an AI assistant to Sealmetrics analytics over MCP.
 *
 * Single source of truth for the /ai-analytics HowTo block, EN and ES. The same
 * array feeds the rendered steps and the `howToSchema()` call, so the structured
 * data can never claim a step the page does not show.
 *
 * Verified against docs.sealmetrics.com/integrations/mcp-server (4 Sep 2026).
 * Keep it in step with that page: docs owns the implementation reference, this
 * page owns the commercial and compliance argument around it. If the endpoint or
 * a client's setup flow changes there, change it here too.
 */

export const MCP_ENDPOINT = "https://mcp.sealmetrics.com/mcp";

export const mcpSetupSteps: HowToStep[] = [
  {
    name: "Create a free Sealmetrics account",
    text: "The Agentic tier is free up to 1M human events in total and needs no card. Register at my.sealmetrics.com, or let your assistant do it from the chat with the AI Agentic Package — no terminal, no dashboard login to start.",
  },
  {
    name: "Add the remote MCP endpoint to your assistant",
    text: "One URL, nothing to install and nothing to keep updated. Sealmetrics hosts the server; your client connects over HTTPS and the analytics tools appear. In Claude.ai, Claude Desktop and ChatGPT, open Settings then Connectors, add a custom connector named Sealmetrics, and paste the endpoint.",
    code: [
      {
        label: "Claude Code",
        language: "bash",
        body: `claude mcp add --transport http sealmetrics ${MCP_ENDPOINT}`,
      },
      {
        label: "Cursor — ~/.cursor/mcp.json",
        language: "json",
        body: `{
  "mcpServers": {
    "sealmetrics": {
      "url": "${MCP_ENDPOINT}"
    }
  }
}`,
      },
      {
        label: "Codex — ~/.codex/config.toml",
        language: "toml",
        body: `[mcp_servers.sealmetrics]
url = "${MCP_ENDPOINT}"`,
      },
    ],
  },
  {
    name: "Confirm the connection",
    text: 'Ask your assistant to list your Sealmetrics sites. If it answers with your sites, the 47 read-only tools are available and you are done.',
  },
  {
    name: "Ask a revenue question, not a metrics question",
    text: 'Each tool maps one business concept to one canonical metric, so the model calls a documented contract instead of guessing at raw columns. Ask "compare this month\'s conversions with last month by channel" or "which campaigns spent without converting last quarter".',
  },
];

export const mcpSetupStepsEs: HowToStep[] = [
  {
    name: "Crea una cuenta gratuita de Sealmetrics",
    text: "El plan Agentic es gratis hasta 1M de eventos humanos en total y no pide tarjeta. Regístrate en my.sealmetrics.com, o deja que tu asistente lo haga desde el chat con el AI Agentic Package: sin terminal y sin entrar al dashboard para empezar.",
  },
  {
    name: "Añade el endpoint MCP remoto a tu asistente",
    text: "Una URL, nada que instalar y nada que mantener actualizado. El servidor lo aloja Sealmetrics; tu cliente se conecta por HTTPS y aparecen las herramientas de analítica. En Claude.ai, Claude Desktop y ChatGPT: Ajustes, luego Conectores, añade un conector personalizado llamado Sealmetrics y pega el endpoint.",
    code: [
      {
        label: "Claude Code",
        language: "bash",
        body: `claude mcp add --transport http sealmetrics ${MCP_ENDPOINT}`,
      },
      {
        label: "Cursor — ~/.cursor/mcp.json",
        language: "json",
        body: `{
  "mcpServers": {
    "sealmetrics": {
      "url": "${MCP_ENDPOINT}"
    }
  }
}`,
      },
      {
        label: "Codex — ~/.codex/config.toml",
        language: "toml",
        body: `[mcp_servers.sealmetrics]
url = "${MCP_ENDPOINT}"`,
      },
    ],
  },
  {
    name: "Comprueba la conexión",
    text: "Pide a tu asistente que liste tus sites de Sealmetrics. Si responde con tus sites, las 47 herramientas de solo lectura están disponibles y ya está.",
  },
  {
    name: "Pregunta por ingresos, no por métricas",
    text: 'Cada herramienta mapea un concepto de negocio a una métrica canónica, así que el modelo llama a un contrato documentado en vez de adivinar sobre columnas crudas. Pregunta "compara las conversiones de este mes con el anterior por canal" o "qué campañas gastaron sin convertir el trimestre pasado".',
  },
];
