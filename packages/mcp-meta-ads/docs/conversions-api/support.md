---
title: "Solução de problemas - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/support"
scraped_at: "2026-02-01T14:08:24.121Z"
---

# Solução de problemas

Na essência, todas as APIs do Facebook compartilham a mesma infraestrutura. Acesse o site dos [Desenvolvedores do Facebook](https://developers.facebook.com/) para ver informações mais relevantes sobre sua situação específica. Você também pode visitar a página [Suporte ao Desenvolvedor](https://developers.facebook.com/support/), verificar [bugs abertos](https://developers.facebook.com/support/bugs/) e dar uma olhada no [Fórum da Comunidade de Desenvolvedores do Facebook](https://developers.facebook.com/community).

## Depurar

A API de Conversões retorna dados mínimos para conservar a largura de banda da rede. Se a carga do evento for válida, um código de resposta `2xx HTTP` será retornado. Se for inválida, um código de resposta `4xx HTTP` será retornado, com mínimos detalhes de erro no corpo de resposta.

[](#)

## Erros de API

Erros de rede ou solicitações malformadas podem causar o abandono de eventos. Recomendamos que você tente fazer novamente a solicitação nos casos em que a resposta indique um erro não cometido pelo cliente, como um tempo-limite. Para contabilizar vários atrasos na rede, recomendamos definir um tempo-limite de 1500 milissegundos na solicitação. Para a maioria das solicitações, o tempo de resposta será inferior a 600 milissegundos.

[](#)

## Central de Ajuda para Empresas

-   [Boas práticas para a API de Conversões](https://www.facebook.com/business/help/308855623839366?id=818859032317965)
    

[](#)

## Meta Blueprint

-   [Solucionar problemas da API de Conversões](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219715-troubleshoot-conversions-api%3Fcontent_id%3DZbUUsTHXsAp6kZO&h=AT2gHcR7Jy4NGEXuoOPIRtA9-wCXB5F30qDOTLDCqVW4PLDcstOiCLP-8QcKnfTuyKqwOIpuIoB6UXbaQN72edvQ1DjqMSEebAC0rwuh1IWe21ZcFIwwyVPOn0tTOZSZBC6oPbTBs5jGlGB5efe6dCQ_96a8glHHglfSM1p0Ic4)
    

[](#)

## Veja também

-   [Perguntas frequentes e melhores práticas para o Gerenciador de Negócios](/docs/marketing-api/businessmanager/bestpractice)
    
-   [Extensão do Chrome para Ferramenta para Pixel da Meta](/docs/facebook-pixel/support/pixel-helper)
    
-   [Perguntas frequentes de desenvolvedores](https://developers.facebook.com/support/faq)
    
-   [Grupo da Comunidade de Desenvolvedores do Facebook](https://www.facebook.com/groups/fbdevelopers)
    

[](#)