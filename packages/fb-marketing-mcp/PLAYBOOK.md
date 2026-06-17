# Playbook: Regras de Negócio para Meta Ads

> **Este arquivo é customizável por empresa.** Contém thresholds, regras de otimização e valores específicos que devem ser ajustados conforme o contexto de cada negócio.

## Sobre Este Arquivo

O `SKILL.md` contém a documentação técnica genérica da API (tools, endpoints, erros). O `ANDROMEDA.md` contém o guia estratégico e técnico completo sobre o Meta Andromeda. Este `PLAYBOOK.md` complementa com:

- Thresholds de performance (incluindo métricas Andromeda)
- Regras de otimização
- Estratégia Andromeda (estrutura, criativos, dados)
- Valores específicos de localização
- Fluxos de diagnóstico com critérios de decisão

**Ao usar este MCP em outra empresa:** Copie e ajuste este arquivo conforme suas métricas e objetivos.

---

## Configurações de Localização

### Brasil (BRL)

| Parâmetro | Valor | Notas |
|-----------|-------|-------|
| Moeda | BRL (R$) | Centavos na API |
| Orçamento mínimo diário | R$ 5,33 (533 centavos) | Varia por país |
| Orçamento recomendado | R$ 6,00+ (600 centavos) | Margem de segurança |
| Fuso horário padrão | America/Sao_Paulo | |

### Outras Localizações (Exemplos)

| País | Moeda | Orçamento Mínimo |
|------|-------|------------------|
| EUA | USD | $1.00 (100 cents) |
| Europa | EUR | €1.00 (100 cents) |
| México | MXN | Verificar na API |

---

## Thresholds de Performance

> **Importante:** Estes valores são sugestões baseadas em benchmarks gerais. Ajuste conforme seu setor, margem e histórico.

### Métricas de Engajamento

| Métrica | Alerta | Bom | Excelente | Ação se abaixo |
|---------|--------|-----|-----------|----------------|
| CTR | < 0.5% | 0.5-1.5% | > 1.5% | Revisar criativo/targeting |
| CPC | > R$ 5.00 | R$ 1-5 | < R$ 1.00 | Otimizar lance |
| CPM | > R$ 50 | R$ 15-50 | < R$ 15 | Revisar targeting |

### Métricas de Conversão

| Métrica | Alerta | Bom | Excelente | Ação se abaixo |
|---------|--------|-----|-----------|----------------|
| CVR (Conv. Rate) | < 1% | 1-3% | > 3% | Revisar landing page |
| CPA | > margem | ~ margem | << margem | Escalar ou pausar |
| ROAS | < 1x | 1-2x | > 2x | Escalar se > 2x |

### Métricas de Atribuição

| % Incremental | Interpretação | Ação Recomendada |
|---------------|---------------|------------------|
| > 50% | Saudável | Manter estratégia atual |
| 30-50% | Atenção | Considerar testar First Conversion |
| < 30% | Risco alto | Testar First Conversion ou revisar targeting |
| < 20% | Crítico | Revisar urgentemente - possível canibalização |

### Métricas Andromeda (Criativo e Sinais)

> Métricas essenciais no contexto do Meta Andromeda. Para contexto completo, veja [ANDROMEDA.md](ANDROMEDA.md).

| Métrica | Alerta | Bom | Excelente | Insight Estratégico |
|---------|--------|-----|-----------|---------------------|
| Hook Rate (3s plays / impressions) | < 20% | 25-30% | > 30% | Valida targeting de "Persona". Baixo = ângulo não para o scroll |
| Hold Rate (ThruPlays / 3s plays) | < 30% | 40-50% | > 50% | Valida narrativa de "Desire". Baixo = conteúdo entediante |
| Creative Similarity | Alto | Médio | Baixo | Alto = falta diversidade, CPMs penalizados |
| Creative Fatigue | CPMs subindo | CPMs estáveis | CPMs em queda | CPMs subindo = hora de refresh |

### Métricas de Qualidade de Dados (CAPI)

| Métrica | Alerta | Bom | Excelente | Ação se abaixo |
|---------|--------|-----|-----------|----------------|
| EMQ (Event Match Quality) | < 4.0 | 4.0-6.0 | > 6.0 | Adicionar mais parâmetros de customer info |
| Event Coverage (CAPI) | < 50% | 50-75% | > 75% | Implementar CAPI para eventos faltantes |
| Deduplication Rate | < 80% | 80-95% | > 95% | Configurar event_id em Pixel e CAPI |

---

## Regras de Otimização Automática

### Pausar Campanha/Ad Set

Pausar automaticamente se:

```
CTR < 0.5% E impressões > 1000
OU
CPA > 2x do target E spend > R$ 100
OU
ROAS < 0.5x E spend > R$ 200
```

### Aumentar Orçamento

Aumentar orçamento em 20-30% se:

```
ROAS > 2x E dados > 7 dias
OU
CPA < 50% do target E conversões > 10
```

### Diminuir Orçamento

Reduzir orçamento em 20% se:

```
ROAS entre 1x e 1.5x E tendência de queda
OU
CPA entre target e 1.5x target
```

---

## Estratégia Andromeda

> Seção baseada nas mudanças introduzidas pelo Meta Andromeda. Para guia completo com referências técnicas da API, veja [ANDROMEDA.md](ANDROMEDA.md).

### Estrutura de Campanhas Recomendada

| Tipo | Estrutura | Bid Strategy | Targeting | Criativos |
|------|-----------|--------------|-----------|-----------|
| **Scaling (CBO)** | 1 campanha por objetivo, 1-2 ad sets | `LOWEST_COST_WITHOUT_CAP` | Broad (`advantage_audience: 1`) | 15-30 vencedores validados |
| **Testing (ABO)** | 1 campanha, ad sets isolados por conceito | `COST_CAP` (50% do CPA target) | Broad com exclusões | 1-2 variações por conceito |
| **Remarketing** | 1 campanha, 1 ad set | `LOWEST_COST_WITHOUT_CAP` | Visitantes/engajadores | 10-20 focados em objeções |

### Volume Criativo

| Nível | Quantidade por Ad Set | Contexto |
|-------|----------------------|----------|
| Mínimo viável | 8-10 | Menos que isso = algoritmo sem dados suficientes |
| Ideal | 15-25 | Volume suficiente sem sobrecarregar produção |
| Avançado | 30-50 | Máxima personalização, grandes budgets |

**Frequência de refresh:** Adicionar novos criativos a cada 7-14 dias. NÃO lançar novas campanhas; alimentar campanhas existentes.

### Diversidade Criativa (Framework P.D.A.)

Gerar criativos variando três dimensões:

- **P - Persona:** Diferentes perfis de público (ex: executivo vs. mãe vs. estudante)
- **D - Desire:** Diferentes motivações de compra (saúde, economia, status, segurança)
- **A - Awareness:** Diferentes estágios da jornada (unaware, solution-aware, most-aware)

**Squint Test:** Se ao estrabar os criativos parecem iguais (mesma paleta, layout), a IA os tratará como mesmo sinal e pode suprimi-los (Similarity Detection).

### Exclusões Estratégicas

Andromeda gravita para conversões "fáceis" (retargeting). Proteja aquisição com exclusões:

- Clientes existentes (upload de emails/telefones)
- Visitantes do site últimos 7-30 dias
- Add-to-cart que não compraram (campanha específica de remarketing)
- Engajadores de conteúdo orgânico recente

### Testing com Half-CPA Strategy

Para testes de novos conceitos criativos (ABO):

```
CPA Cap = 50% do target CPA (ex: target R$ 100 → cap R$ 50)
Daily budget = 2x target CPA (ex: R$ 200)
```

Força algoritmo a buscar apenas conversões mais baratas e de alta probabilidade. Vencedores migram para campanha de scaling (CBO).

### Nomenclatura Andromeda

```
Scaling: [SCALE] - [Objetivo] - [Produto] - Broad - [Data]
Exemplo: [SCALE] - Sales - Curso Python - Broad - 2026-02

Testing: [TEST] - [Conceito PDA] - [Formato] - ABO - [Data]
Exemplo: [TEST] - Exec Produtividade - Video+Static - ABO - 2026-02

Remarketing: [REMARKET] - [Público] - [Produto] - [Data]
Exemplo: [REMARKET] - Visitantes 7d - Curso Python - 2026-02
```

---

## Fluxos de Diagnóstico

### Fluxo 1: Auditoria Rápida de Performance

```
1. Obter insights dos últimos 7 dias
   └── get_account_insights(date_preset: "last_7d")

2. Verificar CTR geral
   ├── Se CTR < 0.5% → Problema de criativo/targeting
   └── Se CTR > 1% → OK, verificar conversões

3. Verificar CPA/ROAS
   ├── Se ROAS < 1x → Pausar ou otimizar
   ├── Se ROAS 1-2x → Monitorar
   └── Se ROAS > 2x → Considerar escalar

4. Listar campanhas com pior performance
   └── Ordenar por CTR ou ROAS

5. Recomendar ações específicas
```

### Fluxo 2: Análise de Eficiência Real (Atribuição)

```
1. Obter comparação de atribuição
   └── get_attribution_comparison(object_id, object_type)

2. Calcular % incremental
   └── incremental / all_conversions × 100

3. Avaliar risco
   ├── Se > 50% → Saudável, manter
   ├── Se 30-50% → Atenção, considerar testes
   └── Se < 30% → Risco, ação imediata

4. Se < 30%:
   ├── Testar First Conversion no ad set
   ├── Revisar targeting (público muito quente?)
   └── Avaliar se está "roubando" conversões orgânicas

5. Ordenar criativos por CPA incremental
   └── Priorizar os com melhor CPA incremental, não CPA padrão
```

### Fluxo 3: Otimização de Criativos

```
1. Listar todos os ads ativos
   └── list_campaign_ads(campaign_id)

2. Obter insights por ad
   └── get_ad_insights para cada ad

3. Classificar por performance
   ├── Top performers: CTR > média + 20%
   ├── Médios: CTR na média ±20%
   └── Baixos: CTR < média - 20%

4. Ações:
   ├── Top: Aumentar orçamento do ad set
   ├── Médios: Manter, iterar variações
   └── Baixos: Pausar se spend > R$ 50
```

### Fluxo 4: Diagnóstico Hot Ad Bias (Andromeda)

```
1. Listar ads com métricas
   └── list_campaign_ads_with_insights(campaign_id)

2. Calcular distribuição de spend
   └── spend_ad / spend_total × 100 para cada ad

3. Verificar concentração
   ├── Se 1 ad > 90% do spend em < 48h → Hot Ad Bias confirmado
   └── Se distribuição equilibrada → OK

4. Se Hot Ad Bias confirmado:
   ├── Verificar se "winner" tem bom ROAS
   │   ├── Se ROAS bom → Aplicar Cost Cap no winner para forçar diversificação
   │   └── Se ROAS ruim → Pausar winner, isolar outros criativos
   ├── Isolar "starved creatives" em novo ad set com budget garantido
   └── Considerar migrar conceitos para ABO testing campaign

5. Monitorar diariamente por 7 dias
```

### Fluxo 5: Auditoria de Diversidade Criativa (Andromeda)

```
1. Listar criativos ativos
   └── list_campaign_ads(campaign_id)

2. Verificar volume
   ├── Se < 8 criativos por ad set → ALERTA: algoritmo sem dados
   ├── Se 8-15 → Aceitável, planejar expansão
   └── Se > 15 → Bom volume

3. Aplicar Squint Test (manual)
   ├── Formatos variados? (video, static, carousel)
   ├── Primeiros 3 segundos distintos visualmente?
   └── Conceitos P.D.A. diferentes?

4. Verificar fadiga criativa
   └── get_campaign_insights(fields: ["cpm"], date_preset: "last_14d")
   ├── CPMs subindo consistentemente → Fadiga, adicionar criativos novos
   └── CPMs estáveis → OK

5. Ações:
   ├── Fadiga → Adicionar 5-10 criativos novos baseados em P.D.A.
   ├── Baixo volume → Produzir criativos com diversidade genuína
   └── Similarity detectada → Variar radicalmente os primeiros 3 segundos
```

### Fluxo 6: Health Check CAPI/EMQ (Andromeda)

```
1. Verificar pixels disponíveis
   └── list_pixels

2. Consultar qualidade de integração
   └── execute_api(GET, "/{version}/dataset_quality?dataset_id={pixel_id}")

3. Avaliar EMQ
   ├── Se EMQ < 4.0 → CRÍTICO: adicionar parâmetros (email, phone, IP)
   ├── Se EMQ 4.0-6.0 → Aceitável, melhorar parâmetros de matching
   └── Se EMQ > 6.0 → BOM

4. Avaliar Event Coverage
   ├── Se < 50% → CRÍTICO: implementar CAPI para eventos faltantes
   ├── Se 50-75% → Aceitável, expandir cobertura
   └── Se > 75% → BOM

5. Avaliar Deduplication
   ├── Se event_id ausente → Configurar deduplication urgentemente
   └── Se event_id presente → Verificar taxa de dedup

6. Ações prioritárias:
   ├── Adicionar parâmetros: em, client_ip_address, fn, ln, ph
   ├── Implementar CAPI para eventos sem cobertura
   └── Configurar event_id para deduplicação Pixel + CAPI
```

---

## Nomenclatura Recomendada

### Campanhas

```
[Objetivo] - [Produto/Serviço] - [Público] - [Data]
Exemplo: TRÁFEGO - Curso Python - Programadores - 2026-02
```

### Ad Sets

```
[Público] - [Posicionamento] - [Lance]
Exemplo: Lookalike 1% - Feed+Stories - Automático
```

### Anúncios

```
[Formato] - [Variação] - [Versão]
Exemplo: Imagem - Benefício1 - V1
```

---

## Estrutura de Testes A/B

### Teste de Público (Modelo Tradicional)

1. Criar campanha com 2+ ad sets
2. Mesmo criativo em todos
3. Orçamento igual por ad set (ABO sem sharing)
4. Rodar por 7 dias ou até 100 conversões
5. Vencedor: Melhor CPA com significância estatística

### Teste de Criativo (Modelo Tradicional)

1. Mesmo ad set
2. 2-4 variações de criativo
3. Deixar Meta otimizar distribuição
4. Analisar após 50+ conversões por variação
5. Pausar perdedores, iterar vencedores

### Modelo Híbrido ABO/CBO (Andromeda)

> Modelo recomendado para o contexto Andromeda. Veja [ANDROMEDA.md](ANDROMEDA.md) para detalhes completos.

**Testing Campaign (ABO) - Validar conceitos novos:**

1. Criar campanha ABO (`is_adset_budget_sharing_enabled: false`)
2. 1 ad set por conceito P.D.A. (1-2 variações cada)
3. Broad targeting (`advantage_audience: 1`)
4. Half-CPA strategy: `bid_strategy: COST_CAP`, `bid_amount` = 50% do CPA target
5. Daily budget por ad set = 2x CPA target
6. NÃO interferir por 7-10 dias (learning phase)
7. Vencedor: Melhor CPA incremental (usar `get_attribution_comparison`)

**Scaling Campaign (CBO) - Escalar vencedores:**

1. Criar campanha CBO com `daily_budget` no nível da campanha
2. 1-2 ad sets com broad targeting
3. `bid_strategy: LOWEST_COST_WITHOUT_CAP`
4. Migrar criativos vencedores do ABO (15-30+)
5. Exclusões: clientes existentes, visitantes recentes
6. Monitorar Hot Ad Bias diariamente (Fluxo 4)
7. Refresh a cada 21-28 dias com novos criativos

**Fluxo de migração:**

```
ABO Testing → Conceito validado (7+ dias, CPA < target)
    → Criar ad no scaling CBO (create_ad)
    → Monitorar performance no novo contexto
    → Se mantém performance → Manter
    → Se degrada → Avaliar se é conflito com outros criativos
```

---

## Alertas e Notificações

### Alertas Críticos (ação imediata)

- Campanha gastou > 50% do orçamento diário em < 6h
- CPA > 3x do target
- Aprovação de anúncio negada
- Conta com problemas de pagamento

### Alertas de Atenção (revisar em 24h)

- CTR caiu > 30% vs semana anterior
- Frequência > 3 (mesma pessoa vendo muitas vezes)
- ROAS caiu abaixo de 1.5x

---

## Histórico de Ajustes

| Data | Alteração | Motivo |
|------|-----------|--------|
| 2026-02-06 | Adicionadas seções Andromeda | Métricas Andromeda, CAPI, fluxos Hot Ad Bias/Diversidade/CAPI, modelo híbrido ABO/CBO, nomenclatura Andromeda |
| 2026-02-05 | Arquivo criado | Separação de elementos específicos do SKILL.md |

---

## Como Usar em Outra Empresa

1. **Copie este arquivo** para o novo projeto
2. **Ajuste a seção de Localização** com sua moeda e orçamentos
3. **Revise os Thresholds** conforme seu setor:
   - E-commerce: ROAS é métrica principal
   - Lead gen: CPA é métrica principal
   - Awareness: CPM e alcance são métricas principais
4. **Adapte os Fluxos** conforme seu processo de otimização
5. **Atualize a Nomenclatura** conforme padrão da empresa

> **Dica:** Mantenha o SKILL.md e ANDROMEDA.md originais (genéricos) e customize apenas este PLAYBOOK.md
