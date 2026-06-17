---
title: "Direcionamento Advantage - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-expansion"
scraped_at: "2026-02-01T14:28:58.255Z"
---

# Direcionamento Advantage

É possível permitir que a Meta expanda algumas opções de direcionamento, ao fazer isso, há um aumento nos resultados a um custo mais baixo por resultado. Expandir as opções individuais de direcionamento não altera as especificações para localização, direcionamento demográfico, como idade ou gênero ou exclusões.

As definições de automação de direcionamento são expressas por meio de propriedades distintas:

-   `targeting_optimization_types` — somente exibição e presente na especificação da campanha, indica automação forçada (semelhantes e direcionamento detalhado)
    
-   `targeting_relaxation_types` — editável e presente na especificação de direcionamento, indica aceitação de semelhantes e expansão do público personalizado
    
-   `targeting_optimization` — editável presente na especificação de direcionamento, indica expansão de direcionamento detalhada
    

Um exemplo de targeting\_optimization\_types:

```
targeting_optimization_types: {
	detailed_targeting: 1,
	lookalike: 1
}
```

As sinalizações `lookalike` e `detailed_targeting` serão definidas como `1` (indicando que a expansão está ativada) nas seguintes metas de otimização:

-   Valor
    
-   Instalações do app
    
-   Eventos do app
    
-   Conversas
    
-   Cliques fora do site
    
-   Visualizações da página de destino
    
-   Respostas
    
-   Conversões de compra por mensagem
    
-   Respostas a enquetes de pesquisa
    
-   Valor no app
    
-   Assinantes
    
-   Cliques
    
-   Lembrete definido
    
-   Impressões sociais
    
-   Obtenções de oferta
    
-   Conversões fora do site
    
-   Retorno sobre o investimento em publicidade
    
-   Conversões no site
    
-   Instalações do app e conversões fora do site
    
-   Conversões incrementais fora do site
    
-   Visitas ao estabelecimento
    

Para outras metas de otimização, esta configuração não será mostrada. As configurações de automação de direcionamento de aceitação/recusa de `targeting_relaxation_types` e `targeting_optimization` são abordadas na documentação [Público Advantage+](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-audience), [Direcionamento Detalhado Advantage](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-detailed-targeting), [Público Semelhante Advantage](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-lookalike) e [Público personalizado Advantage](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-custom-audience).

**Nota:** a automação não é aceita em fluxos de [Categorias de anúncio especial](/docs/marketing-api/audiences/special-ad-category/) e [Reserva](/docs/marketing-api/reachandfrequency/).