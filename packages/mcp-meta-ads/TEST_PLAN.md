# Plano de Testes — Multi-Account MCP

**Data:** 2026-02-23
**Contas usadas:**
- Conta 1: `act_618288566086470` (CA01 - ZAP, ACTIVE)
- Conta 2: `act_590314979320159` (Conta 03 - ZapVoice Separada, UNSETTLED)

---

## Grupo 1: discover_ad_accounts (sem account_id)
| # | Teste | Esperado | Status | Notas |
|---|-------|----------|--------|-------|
| 1 | `discover_ad_accounts` | Lista contas com IDs `act_*` + instrução multi-account | PASS | Retornou 2 contas com mensagem "Passe o account_id desejado" |

## Grupo 2: Validação — account_id obrigatório
| # | Teste | Esperado | Status | Notas |
|---|-------|----------|--------|-------|
| 2 | `list_campaigns` sem `account_id` | Erro de validação | PASS | "account_id: Invalid input: expected string, received undefined" |
| 3 | `list_adsets` sem `account_id` | Erro de validação | PASS | Mesma mensagem |
| 4 | `get_account_insights` sem `account_id` | Erro de validação | PASS | Mesma mensagem |

## Grupo 3: Leitura com account_id explícito
| # | Teste | Esperado | Status | Notas |
|---|-------|----------|--------|-------|
| 5 | `list_campaigns` conta 1 | Campanhas da conta 1 | PASS | 25 campanhas retornadas |
| 6 | `list_campaigns` conta 2 | Campanhas da conta 2 | PASS | 5 campanhas (dados diferentes da conta 1) |
| 7 | `list_campaigns` com id sem prefixo `act_` | Normaliza e funciona | PASS | `618288566086470` → mesmas 25 campanhas |
| 8 | `list_adsets` com `account_id` | Ad sets | PASS | 25 ad sets retornados |
| 9 | `list_ads` com `account_id` | Ads | PASS | 25 ads retornados |
| 10 | `list_creatives` com `account_id` | Criativos | PASS | 25 criativos retornados |
| 11 | `get_account_insights` + `date_preset: "last_7d"` | Insights | PASS | R$78.61 gasto, 6.292 impressões |
| 12 | `get_performance_summary` com `account_id` | Resumo | PASS | ROAS 1.42x, 138 purchases, 18.8% incremental |
| 13 | `list_custom_audiences` com `account_id` | Audiências | PASS | 25 audiências |
| 14 | `list_pixels` com `account_id` | Pixels | PASS | 3 pixels retornados |
| 15 | `list_value_rule_sets` com `account_id` | Value rules | PASS | 0 rule sets (vazio, sem erro) |
| 16 | `list_ad_labels` com `account_id` | Labels | PASS | 2 labels retornados |

## Grupo 4: Alternância entre contas
| # | Teste | Esperado | Status | Notas |
|---|-------|----------|--------|-------|
| 17 | `list_campaigns` conta1 → conta2 seguidos | Dados diferentes por conta | PASS | Coberto testes 5+6: 25 vs 5 campanhas |
| 18 | `get_account_insights` conta1 → conta2 | Métricas diferentes | PASS | Conta1=R$78.61 gasto / Conta2="Nenhum dado disponível" |

## Grupo 5: Tools por ID (sem account_id)
| # | Teste | Esperado | Status | Notas |
|---|-------|----------|--------|-------|
| 19 | `get_campaign` com `campaign_id` | Funciona sem account_id | PASS | Retornou ZAP_VENDAS_BID_INC_3, CBO R$100/dia |
| 20 | `get_adset` com `adset_id` | Funciona | PASS | Retornou 00-ADV com targeting e atribuição |
| 21 | `get_ad` com `ad_id` | Funciona | PASS | Retornou AD12 com creative e tracking_specs |
| 22 | `get_creative` com `creative_id` | Funciona | PASS | Retornou criativo com video_data e object_story_spec |

## Grupo 6: execute_api
| # | Teste | Esperado | Status | Notas |
|---|-------|----------|--------|-------|
| 23 | `execute_api` endpoint `{ad_account_id}/campaigns` + `account_id` | Substitui placeholder | PASS | Placeholder substituído, 3 campanhas retornadas |
| 24 | `execute_api` sem account_id, endpoint `me/adaccounts` | Funciona | PASS | Retornou 2 contas |

## Grupo 7: OAuth flow (se DB configurado)
| # | Teste | Esperado | Status | Notas |
|---|-------|----------|--------|-------|
| 25 | GET `/oauth/settings` | Form sem campo ad_account_id | SKIP | Sem DB local configurado |
| 26 | POST com apenas `meta_access_token` | Salva token | SKIP | Sem DB local configurado |

---

## Resultado: 24/24 PASS, 2 SKIP (OAuth sem DB)

## Bugs Encontrados
Nenhum bug encontrado.

## Pontos de Melhoria
1. ~~**Token exposto em paging.next**~~ — **RESOLVIDO**: Implementado `sanitizePagingUrls()` em `api-tools.ts` que substitui `access_token=XXX` por `access_token=***` em URLs de paginação.
2. **Limite de 25 resultados** — Todas as tools de listagem retornaram max 25 itens (paginação padrão da Graph API). Considerar adicionar parâmetro `limit` ou paginação automática para contas com muitos objetos.
3. **Testes OAuth (25-26)** — Não puderam ser testados sem banco de dados local. Considerar testar em ambiente Docker com o `docker-compose.yml`.
4. **Docs atualizados** — Removidas todas as referências ao `META_AD_ACCOUNT_ID` de: README.md, SKILL.md, CUSTOM_API_CALLS.md, docs/QUICK_REFERENCE.md. Documentado fluxo multi-account.
