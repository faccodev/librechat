/**
 * Auth Context para multi-tenant HTTP
 *
 * Usa AsyncLocalStorage para isolar credenciais Meta por request.
 * No modo stdio, não é utilizado (MetaClient usa env vars como fallback).
 */

import { AsyncLocalStorage } from 'node:async_hooks';

export interface AuthContext {
  accessToken: string;
  apiVersion?: string;
  userId?: string;
  permissions?: 'read' | 'readwrite';
  tier?: 'free' | 'pro' | 'enterprise';
}

const authStorage = new AsyncLocalStorage<AuthContext>();

/**
 * Executa uma função dentro de um auth context isolado.
 * Cada request HTTP chama isto com as credenciais do header.
 */
export function withAuthContext<T>(ctx: AuthContext, fn: () => T): T {
  return authStorage.run(ctx, fn);
}

/**
 * Retorna o auth context do request atual, ou null se não estiver em contexto HTTP.
 */
export function getAuthContext(): AuthContext | null {
  return authStorage.getStore() ?? null;
}
