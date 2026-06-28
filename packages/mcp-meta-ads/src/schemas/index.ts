/**
 * Schemas Zod - Index
 *
 * Centraliza exports de schemas e utilitários para validação
 */

import { z } from 'zod';

// Re-export schemas
export * from './docs-schemas.js';
export * from './api-schemas.js';

// Re-export Zod
export { z };

/**
 * Resultado de validação
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Preprocess MCP args: coerce string-encoded numbers and JSON-encoded objects.
 * The MCP protocol may serialize all values as strings, so we need to convert
 * them back to their expected types before Zod validation.
 */
function preprocessMcpArgs(args: unknown): unknown {
  if (args === null || args === undefined || typeof args !== 'object') return args;
  const obj = args as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      // Try to parse JSON strings (objects/arrays) — but NOT plain strings or numbers
      if ((value.startsWith('{') && value.endsWith('}')) || (value.startsWith('[') && value.endsWith(']'))) {
        try {
          result[key] = JSON.parse(value);
          continue;
        } catch { /* keep as string */ }
      }
      // Coerce boolean strings
      if (value === 'true') { result[key] = true; continue; }
      if (value === 'false') { result[key] = false; continue; }
    }
    result[key] = value;
  }
  return result;
}

/**
 * Valida argumentos com um schema Zod
 */
export function validateArgs<T>(
  schema: z.ZodType<T>,
  args: unknown
): ValidationResult<T> {
  const preprocessed = preprocessMcpArgs(args);
  const result = schema.safeParse(preprocessed);

  if (result.success) {
    return { success: true, data: result.data };
  }

  // Formatar erros do Zod
  const messages = result.error.issues.map((issue) => {
    const path = issue.path.join('.');
    return path ? `${path}: ${issue.message}` : issue.message;
  });

  return { success: false, error: `Parâmetros inválidos:\n- ${messages.join('\n- ')}` };
}

/**
 * Formata erro de validação para resposta MCP
 */
export function formatValidationError(error: string): {
  content: Array<{ type: 'text'; text: string }>;
  isError: boolean;
} {
  return {
    content: [
      {
        type: 'text',
        text: `# Erro de Validação\n\n${error}`,
      },
    ],
    isError: true,
  };
}
