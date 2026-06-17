/**
 * Configuração e validação de variáveis de ambiente
 * para a camada de execução (API Meta)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getAuthContext } from './auth-context.js';

export interface MetaConfig {
  accessToken: string;
  apiVersion: string;
}

/**
 * Carrega variáveis de um arquivo .env (fallback quando process.env não tem as variáveis)
 */
function loadDotEnv(): void {
  // Só carrega se as variáveis não existirem
  if (process.env.META_ACCESS_TOKEN) {
    return;
  }

  // Procura .env na raiz do projeto
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envPath = path.resolve(__dirname, '..', '..', '.env');

  try {
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      // Strip surrounding quotes ("..." or '...')
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Silently ignore .env loading errors
  }
}

// Carrega .env ao importar o módulo
loadDotEnv();

/**
 * Obtém a configuração da API Meta das variáveis de ambiente
 *
 * Variáveis obrigatórias:
 * - META_ACCESS_TOKEN: Token de acesso da API
 *
 * Variáveis opcionais:
 * - META_API_VERSION: Versão da API (default: v24.0)
 */
export function getMetaConfig(): MetaConfig | null {
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!accessToken) {
    return null;
  }

  return {
    accessToken,
    apiVersion: process.env.META_API_VERSION || 'v24.0',
  };
}

/**
 * Verifica se a API Meta está configurada (via auth context ou env vars)
 */
export function isMetaConfigured(): boolean {
  // Check auth context first (HTTP multi-tenant with DB tokens)
  const authCtx = getAuthContext();
  if (authCtx && authCtx.accessToken) {
    return true;
  }
  // Fallback to env vars (stdio mode)
  return getMetaConfig() !== null;
}

/**
 * Retorna mensagem de erro para quando a API não está configurada
 */
export function getConfigurationError(): string {
  return `A API da Meta não está configurada. Configure as seguintes variáveis de ambiente:

- META_ACCESS_TOKEN: Token de acesso da API (obrigatório)
- META_API_VERSION: Versão da API (opcional, default: v24.0)

Exemplo de configuração no MCP:
{
  "mcpServers": {
    "fb-marketing-mcp": {
      "command": "npx",
      "args": ["-y", "fb-marketing-mcp"],
      "env": {
        "META_ACCESS_TOKEN": "seu_token_aqui"
      }
    }
  }
}

Use a tool "discover_ad_accounts" para listar as contas de anúncio disponíveis e passe o account_id em cada chamada.`;
}
