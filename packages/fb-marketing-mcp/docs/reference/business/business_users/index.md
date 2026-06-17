---
title: "Graph API Referência v24.0: Business Business Users"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/business_users/"
scraped_at: "2026-02-01T16:07:26.250Z"
---

![](https://facebook.com/security/hsts-pixel.gif)

[

Documentos

](/docs/)

[

API de Marketing

](/docs/marketing-api)

[

Referência da API

](/docs/marketing-api/reference/)

[

Business

](/docs/marketing-api/reference/business/)

[

Business Users

](/docs/marketing-api/reference/business/business_users)

[API de Marketing](/docs/marketing-api)

-   [Visão geral](/docs/marketing-api/overview)
-   [Começar](/docs/marketing-api/get-started)
-   [Criativo do anúncio](/docs/marketing-api/creative)
-   [Bidding](/docs/marketing-api/bidding)
-   [Mecanismo de regras de anúncios](/docs/marketing-api/ad-rules)
-   [Públicos](/docs/marketing-api/audiences)
-   [API de Insights](/docs/marketing-api/insights)
-   [Adequação e segurança para marcas](/docs/marketing-api/brand-safety-and-suitability)
-   [Boas práticas](/docs/marketing-api/best-practices)
-   [Solução de problemas](/docs/marketing-api/troubleshooting)
-   [Referência da API](/docs/marketing-api/reference)
-   [Registro de alterações](/docs/marketing-api/marketing-api-changelog)

* * *

![Meta](https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg)

[![Facebook](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/425860105_925920989121941_6933048753023841367_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=c6KI8Q4sBT0Q7kNvwHC4Ctu&_nc_oc=AdlmxcGjzV5j3CUVSxSpW0Brabq6M3_TwvcBR8CbS13cHaxFLdw0vS3_NnFL7lOLPuO7K9lC24hqQjY8LCzbANoT&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=fHCHUjTwSjHOqZpcwcMwbw&oh=00_Aft2ot90wtp9C_Y8lWEqpWsS7WzZL3ImYpoHj4ixSWBWlw&oe=69855FA2)](https://www.facebook.com/MetaforDevelopers)[![Instagram](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/425804778_757649995874129_6917476492193301523_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=GARwgTjAwOgQ7kNvwGDJyts&_nc_oc=AdnoiavHKmSs2Fa-lj0GrCnnK5NPW9KDPOeBuf5xWJfQ6-QgpfshjujeHR1HMJpqEP8fXl4zdOR53Xhjr7BEBEJJ&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=fHCHUjTwSjHOqZpcwcMwbw&oh=00_AfvAzGMUT-1Rx7co93l904WqlTzbiMDTQtnGFf-NEznjwQ&oe=698549B8)](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fmetafordevelopers%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)[![X](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/426747931_385023204117867_5811151062540225287_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=lhz5pdf8bKoQ7kNvwFqvz0C&_nc_oc=AdlVh7U6UMHEX-LFFnFefpvLGzUdYu-BI3Dpu_7z2UEtjZUQD92lJdTJChMhX6NgT-9zUSeE5RK5pO8VfezwCtuV&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=fHCHUjTwSjHOqZpcwcMwbw&oh=00_AfsoYWrcHa10uyfvEIZI0RuBdvn1vzySojwKi0vTvYTr0Q&oe=6985682A)](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fmetafordevs&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)[![LinkedIn](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/467689750_1684384502343829_7561568713040200172_n.svg?_nc_cat=103&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=4EYrMft8sxIQ7kNvwET8_5v&_nc_oc=AdmQ6JmKNCf5-JfydX2bANPoBZyHwIwUYVh1BbXOq6m_TgDhTjLwxGoyXuL2K9jmJ9r4BUmYrKFRCcBicfyUZanY&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=fHCHUjTwSjHOqZpcwcMwbw&oh=00_AfujKpRt8FepjXe3EbuaNa4DSkYJyGerqE88srYPt50vVw&oe=69853F7E)](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fshowcase%2Fmeta-for-developers%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)[![YouTube](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/425519002_724756916408357_7491658959807896355_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=z1gRydRArR8Q7kNvwH4Mv_0&_nc_oc=AdlVJKF2b3NOXeJXgqUliorhOy-BOkbqWECLPChA2HEwXXuA4-w3ZApYsrZy3YOQYo-I69RhMM3YhHCIgX8BaIyq&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=fHCHUjTwSjHOqZpcwcMwbw&oh=00_AfuRYctpB4qrJCqkiTotEr_U2VIWEhhSGdRpTsqTON6P9g&oe=698562DF)](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2FMetaDevelopers%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

Desenvolva com a Meta

[IA](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fai%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)[Meta Horizon](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fhorizon%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs) [Tecnologias sociais](/social-technologies/)

* * *

Notícias

[Meta for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fblog%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)[Blog](/blog/)[Casos de sucesso](/success-stories/)

* * *

Suporte

[Suporte ao desenvolvedor](/support/)[Ferramenta de bug](/support/bugs/)[Status da plataforma](https://l.facebook.com/l.php?u=https%3A%2F%2Fmetastatus.com%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)[Fórum da Comunidade de Desenvolvedores](https://www.facebook.com/groups/fbdevelopers/)[Relatar um incidente](/incident/report/)

* * *

Termos e políticas

[Iniciativas de plataforma responsável](/products/responsible-platform-initiatives/)[Termos da plataforma](/terms/dfc_platform_terms/)[Políticas do Desenvolvedor](/devpolicy/)[Política de Privacidade](https://www.facebook.com/about/privacy)[Cookies](https://www.facebook.com/help/cookies)

* * *

Quem somos

[Sobre](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)[Carreiras](https://www.facebook.com/careers)

* * *

Desenvolva com a Meta

[IA](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fai%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Meta Horizon](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fhorizon%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Tecnologias sociais](/social-technologies/)

Notícias

[Meta for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fblog%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Blog](/blog/)

[Casos de sucesso](/success-stories/)

Suporte

[Suporte ao desenvolvedor](/support/)

[Ferramenta de bug](/support/bugs/)

[Status da plataforma](https://l.facebook.com/l.php?u=https%3A%2F%2Fmetastatus.com%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Fórum da Comunidade de Desenvolvedores](https://www.facebook.com/groups/fbdevelopers/)

[Relatar um incidente](/incident/report/)

Quem somos

[Sobre](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Carreiras](https://www.facebook.com/careers)

Termos e políticas

[Iniciativas de plataforma responsável](/products/responsible-platform-initiatives/)

[Termos da plataforma](/terms/dfc_platform_terms/)

[Políticas do Desenvolvedor](/devpolicy/)

[Política de Privacidade](https://www.facebook.com/about/privacy)

[Cookies](https://www.facebook.com/help/cookies)

Desenvolva com a Meta

[IA](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fai%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Meta Horizon](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fhorizon%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Tecnologias sociais](/social-technologies/)

Notícias

[Meta for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fblog%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Blog](/blog/)

[Casos de sucesso](/success-stories/)

Suporte

[Suporte ao desenvolvedor](/support/)

[Ferramenta de bug](/support/bugs/)

[Status da plataforma](https://l.facebook.com/l.php?u=https%3A%2F%2Fmetastatus.com%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Fórum da Comunidade de Desenvolvedores](https://www.facebook.com/groups/fbdevelopers/)

[Relatar um incidente](/incident/report/)

Quem somos

[Sobre](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Carreiras](https://www.facebook.com/careers)

Termos e políticas

[Iniciativas de plataforma responsável](/products/responsible-platform-initiatives/)

[Termos da plataforma](/terms/dfc_platform_terms/)

[Políticas do Desenvolvedor](/devpolicy/)

[Política de Privacidade](https://www.facebook.com/about/privacy)

[Cookies](https://www.facebook.com/help/cookies)

Desenvolva com a Meta

[IA](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fai%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Meta Horizon](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fhorizon%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Tecnologias sociais](/social-technologies/)

Notícias

[Meta for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fblog%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Blog](/blog/)

[Casos de sucesso](/success-stories/)

Suporte

[Suporte ao desenvolvedor](/support/)

[Ferramenta de bug](/support/bugs/)

[Status da plataforma](https://l.facebook.com/l.php?u=https%3A%2F%2Fmetastatus.com%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Fórum da Comunidade de Desenvolvedores](https://www.facebook.com/groups/fbdevelopers/)

[Relatar um incidente](/incident/report/)

Quem somos

[Sobre](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2F&h=AT1uZg1nHtXYKsy_oefIyWCl1foPQFUXC1tw56s9Mbvhqn-CjHmzMJd_q-gQj1WEMTJJ59CW8faPhvC8SW0uD3UJY-5FFB3RpUPrEpluj9rTtzKBv0eegN5Y9fTUJcY3HAdSk0X1YIJ0gypq71aPoCPcKI7vR7utj735HvHWbGs)

[Carreiras](https://www.facebook.com/careers)

Termos e políticas

[Iniciativas de plataforma responsável](/products/responsible-platform-initiatives/)

[Termos da plataforma](/terms/dfc_platform_terms/)

[Políticas do Desenvolvedor](/devpolicy/)

[Política de Privacidade](https://www.facebook.com/about/privacy)

[Cookies](https://www.facebook.com/help/cookies)

Português (Brasil)