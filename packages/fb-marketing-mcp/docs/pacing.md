---
title: "Regularidade e programação - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/pacing"
scraped_at: "2026-02-01T13:55:22.909Z"
---

# Regularidade e programação

Determina como o orçamento dos seus anúncios é gasto ao longo do tempo. Ela oferece uma concorrência uniforme no leilão de anúncios do Facebook entre todos os anunciantes a cada dia, além de alocar automaticamente os orçamentos para diferentes anúncios. A regularidade funciona da mesma maneira para anúncios criados com a API e para ferramentas do Facebook. Consulte [Veiculação e regularidade na Central de Ajuda de Anúncios](https://www.facebook.com/business/help/1037425549606837).

É possível definir três opções de regularidade em `pacing_type` ao criar ou atualizar um [conjunto de anúncios](/docs/marketing-api/reference/ad-campaign). Com a regularidade padrão, incluímos seu anúncio em todos os leilões relevantes e ajustamos o lance ao longo do dia para gerar a veiculação ideal e regular em relação ao seu objetivo e orçamento. Essa é a regularidade padrão.

Para redefini-la:

```
v24.0
```

A **veiculação acelerada** remove todos os ajustes de regularidade do lance. Incluímos seu anúncio em todos os leilões elegíveis com o lance máximo. Você pode alcançar uma veiculação máxima com orçamento e custo especificados. Isso resulta em veiculações irregulares ao longo do dia. Dessa forma, o orçamento do seu conjunto de anúncios pode se esgotar antes do fim do dia. Para criar um conjunto de anúncios com **veiculação acelerada**:

```
v24.0
```

É possível desabilitar a regularidade para estes casos:

-   Anunciar vendas relâmpago ou promoções por tempo limitado.
    
-   Veicular anúncios em eventos ao vivo, como partidas esportivas e debates eleitorais.
    
-   Maximizar a veiculação durante períodos importantes do ano, como a época de festas de fim de ano ou de volta às aulas.
    

Não use essa opção nas seguintes situações:

-   Seu anúncio apresenta veiculação abaixo do esperado porque o lance foi muito baixo ou o direcionamento foi muito restritivo. Nesses casos, já removemos a regularidade do orçamento, então, a veiculação acelerada não ajudará.
    

Consulte a [referência Opções de regularidade do conjunto de anúncios](/docs/marketing-api/adset/pacing).

Você também pode definir o pacing\_type como `day_parting` para ter um controle mais preciso da programação de anúncios. Veja `"Ad Scheduling"`.

## Programação de anúncios

Especifique os dias da semana e as horas do dia para a veiculação do seu conjunto de anúncios em `adset_schedule`. A programação se aplica a todos os grupos de anúncios do conjunto de anúncios. Consulte [Programação de anúncios em nosso blog](/ads/blog/post/2014/08/13/ad-scheduling). `adset_schedule` é uma matriz de objetos JSON. Cada objeto representa uma programação para um único dia. Por exemplo:

```
v24.0
```

Para atualizar a **programação de anúncios**:

```
v24.0
```

Para desativar a **programação de anúncios**:

```
v24.0
```

Para obter informações sobre a **programação de anúncios**:

```
v24.0
```
  

Cada matriz deve ter:

Nome do campo

Descrição

`start_minute`

tipo: int

Minuto do dia com base 0. Quando a programação inicia

`end_minute`

tipo: int

Minuto do dia com base 0. Quando a programação termina

`days`

Tipo: matriz de números inteiros

Dias de programação ativa. Valores válidos: 0 a 6, em que 0 corresponde a domingo, 1 a segunda-feira e 6 a sábado.

`timezone_type`

Opcional

Se o valor é "user", o fuso horário do visualizador. Se o valor é "advertizer", o fuso horário da conta.

`start_minute` e `end_minute` devem representar horas inteiras e ter pelo menos uma hora de diferença. Para [alcance e frequência](/docs/marketing-api/reachandfrequency/), as partes do dia devem ter no mínimo 4 horas. Por exemplo:

```
[{'start_minute':540,'end_minute':720,'days':[1,2,3,4,5]},{'start_minute':180, 'end_minute':360,'days':[0,6]}]
```

Aplicam-se estas restrições:

-   Use a programação de anúncios somente com orçamentos totais.
    
-   A programação se aplica ao fuso horário do público-alvo dos anúncios de um conjunto, **não da conta de anúncios**. Se o fuso horário da sua conta de anúncios for o horário do Leste dos EUA, mas seus anúncios forem direcionados para pessoas na Califórnia (horário do Pacífico), seus anúncios programados para veiculação entre as 18h e 21h serão exibidos para as pessoas na Califórnia entre as 18h e 21h no horário do Pacífico, e não no horário da sua conta.
    

[](#)

## Perguntas frequentes

[](#)

[My ads are not pacing correctly, what do I do?](#faq_2232425777087535)

For under-delivery, your bid price might be too low or your audience too narrow. Your bid should be in the suggested bid range so your ads win auctions and get placement. With competitive target audiences, you may need to bid above the suggested bid range. Or your targeting is too narrow.

If we over-deliver your ad, you might have a very large audience that quickly exhausts budget. If you believe that is not the case, contact us at [Facebook Advertising Help](https://www.facebook.com/business/help).

[Link permanente](#faq_2232425777087535)

[](#)

[Is pacing at the ad set or ad campaign level?](#faq_290777248538550)

If you're using campaign budget optimization, budget pacing is at the campaign level. Otherwise, budget pacing is done at the ad set level.

[Link permanente](#faq_290777248538550)

[](#)

[When I change my budget, will it impact pacing?](#faq_2222627511146465)

When you change budget, our systems have to learn the new optimal bid which takes time. During this time, your bids are not optimal and we can't maximize ROI. Therefore you should not change bid and budget **frequently**.

[Link permanente](#faq_2222627511146465)

[](#)

[When should I change bid or budget?](#faq_644281972666201)

If you have to change these parameters, limit yourself to 2-3 times a day and only the early part of the day. This impacts pacing less than changing it often or later in a day.

[Link permanente](#faq_644281972666201)

[](#)

[What about campaigns that run only a day or shorter?](#faq_849734268694368)

Facebook optimizes pacing within a day, so this is not a problem.

[Link permanente](#faq_849734268694368)

[](#)

[I have ads with 'billing\_event' as 'IMPRESSIONS' and I switched 'billing\_event' to 'LINK\_CLICKS'. Will this affect pacing?](#faq_2130174283732193)

Pacing may change. Since you switch from view-based billing to click-based billing, we re-adjust pacing.

[Link permanente](#faq_2130174283732193)

[](#)

[I don't see 'max\_bid' for different bid types, where is it?](#faq_2117755961607050)

Max bid is `bid_amount` of an ad set you specify regardless of its optimization goal.

[Link permanente](#faq_2117755961607050)

[](#)

[How does day parting and pacing work together?](#faq_703725050030787)

With ad scheduling, you schedule hours in a day and days in a week when your ads display to a target audience. You can have your ads display when they are most relevant to an audience. Pacing takes this schedule into account to calculate your effective, optimal bid. See [ad scheduling](/docs/marketing-api/adset/pacing#ad-scheduling).

[Link permanente](#faq_703725050030787)

[](#)

[How does Facebook spend ad set budgets over partial days?](#faq_304277833835641)

From April 9th, 2014, we change the way budgets are spent on partial days at the beginning and end of ad set schedules. For ad sets with daily budgets, we adjust the first and last day spend based on the number of hours we have to deliver ads on those days. For example, if your ad set starts at 6PM, we try to deliver only 25% of daily budget between 6 PM and midnight.

[Link permanente](#faq_304277833835641)

[](#)