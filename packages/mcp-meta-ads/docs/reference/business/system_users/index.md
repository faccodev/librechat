---
title: "Graph API Referência v24.0: Business System Users"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/system_users/"
scraped_at: "2026-02-01T16:11:05.135Z"
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

System Users

](/docs/marketing-api/reference/business/system_users)

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

[![Facebook](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/425860105_925920989121941_6933048753023841367_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=c6KI8Q4sBT0Q7kNvwHC4Ctu&_nc_oc=AdlmxcGjzV5j3CUVSxSpW0Brabq6M3_TwvcBR8CbS13cHaxFLdw0vS3_NnFL7lOLPuO7K9lC24hqQjY8LCzbANoT&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=TaSYvDMjnnUkZOg3Yh5evQ&oh=00_AfuwpPBpjTt0ICnS2nmyRgsiYy4w_noT76x0ulwdqB6XZw&oe=69855FA2)](https://www.facebook.com/MetaforDevelopers)[![Instagram](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/425804778_757649995874129_6917476492193301523_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=GARwgTjAwOgQ7kNvwGDJyts&_nc_oc=AdnoiavHKmSs2Fa-lj0GrCnnK5NPW9KDPOeBuf5xWJfQ6-QgpfshjujeHR1HMJpqEP8fXl4zdOR53Xhjr7BEBEJJ&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=TaSYvDMjnnUkZOg3Yh5evQ&oh=00_Afti2aiLyiLhOG32Vo6UaTSpODH4z_sNv94LiTe0A5RbbQ&oe=698549B8)](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fmetafordevelopers%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)[![X](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/426747931_385023204117867_5811151062540225287_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=lhz5pdf8bKoQ7kNvwFqvz0C&_nc_oc=AdlVh7U6UMHEX-LFFnFefpvLGzUdYu-BI3Dpu_7z2UEtjZUQD92lJdTJChMhX6NgT-9zUSeE5RK5pO8VfezwCtuV&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=TaSYvDMjnnUkZOg3Yh5evQ&oh=00_Afu1Z44AFaRfuLybWn3E5xfltpkg5PiwJNZo3XubHVazlw&oe=6985682A)](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fmetafordevs&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)[![LinkedIn](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/467689750_1684384502343829_7561568713040200172_n.svg?_nc_cat=103&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=4EYrMft8sxIQ7kNvwET8_5v&_nc_oc=AdmQ6JmKNCf5-JfydX2bANPoBZyHwIwUYVh1BbXOq6m_TgDhTjLwxGoyXuL2K9jmJ9r4BUmYrKFRCcBicfyUZanY&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=TaSYvDMjnnUkZOg3Yh5evQ&oh=00_Afu4n_-v00N5qzceciF6lDlkeFMejvTdZsp9W0U78prrhA&oe=69853F7E)](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fshowcase%2Fmeta-for-developers%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)[![YouTube](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/425519002_724756916408357_7491658959807896355_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=aa6a2f&_nc_ohc=z1gRydRArR8Q7kNvwH4Mv_0&_nc_oc=AdlVJKF2b3NOXeJXgqUliorhOy-BOkbqWECLPChA2HEwXXuA4-w3ZApYsrZy3YOQYo-I69RhMM3YhHCIgX8BaIyq&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=TaSYvDMjnnUkZOg3Yh5evQ&oh=00_AfviHaDOQXPf7ivmyd9xLNqN7ruHQFuTRDhVugiOC9eO_Q&oe=698562DF)](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2FMetaDevelopers%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

Desenvolva com a Meta

[IA](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fai%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)[Meta Horizon](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fhorizon%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE) [Tecnologias sociais](/social-technologies/)

* * *

Notícias

[Meta for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fblog%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)[Blog](/blog/)[Casos de sucesso](/success-stories/)

* * *

Suporte

[Suporte ao desenvolvedor](/support/)[Ferramenta de bug](/support/bugs/)[Status da plataforma](https://l.facebook.com/l.php?u=https%3A%2F%2Fmetastatus.com%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)[Fórum da Comunidade de Desenvolvedores](https://www.facebook.com/groups/fbdevelopers/)[Relatar um incidente](/incident/report/)

* * *

Termos e políticas

[Iniciativas de plataforma responsável](/products/responsible-platform-initiatives/)[Termos da plataforma](/terms/dfc_platform_terms/)[Políticas do Desenvolvedor](/devpolicy/)[Política de Privacidade](https://www.facebook.com/about/privacy)[Cookies](https://www.facebook.com/help/cookies)

* * *

Quem somos

[Sobre](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)[Carreiras](https://www.facebook.com/careers)

* * *

Desenvolva com a Meta

[IA](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fai%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Meta Horizon](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fhorizon%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Tecnologias sociais](/social-technologies/)

Notícias

[Meta for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fblog%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Blog](/blog/)

[Casos de sucesso](/success-stories/)

Suporte

[Suporte ao desenvolvedor](/support/)

[Ferramenta de bug](/support/bugs/)

[Status da plataforma](https://l.facebook.com/l.php?u=https%3A%2F%2Fmetastatus.com%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Fórum da Comunidade de Desenvolvedores](https://www.facebook.com/groups/fbdevelopers/)

[Relatar um incidente](/incident/report/)

Quem somos

[Sobre](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Carreiras](https://www.facebook.com/careers)

Termos e políticas

[Iniciativas de plataforma responsável](/products/responsible-platform-initiatives/)

[Termos da plataforma](/terms/dfc_platform_terms/)

[Políticas do Desenvolvedor](/devpolicy/)

[Política de Privacidade](https://www.facebook.com/about/privacy)

[Cookies](https://www.facebook.com/help/cookies)

Desenvolva com a Meta

[IA](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fai%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Meta Horizon](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fhorizon%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Tecnologias sociais](/social-technologies/)

Notícias

[Meta for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fblog%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Blog](/blog/)

[Casos de sucesso](/success-stories/)

Suporte

[Suporte ao desenvolvedor](/support/)

[Ferramenta de bug](/support/bugs/)

[Status da plataforma](https://l.facebook.com/l.php?u=https%3A%2F%2Fmetastatus.com%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Fórum da Comunidade de Desenvolvedores](https://www.facebook.com/groups/fbdevelopers/)

[Relatar um incidente](/incident/report/)

Quem somos

[Sobre](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Carreiras](https://www.facebook.com/careers)

Termos e políticas

[Iniciativas de plataforma responsável](/products/responsible-platform-initiatives/)

[Termos da plataforma](/terms/dfc_platform_terms/)

[Políticas do Desenvolvedor](/devpolicy/)

[Política de Privacidade](https://www.facebook.com/about/privacy)

[Cookies](https://www.facebook.com/help/cookies)

Desenvolva com a Meta

[IA](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fai%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Meta Horizon](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fhorizon%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Tecnologias sociais](/social-technologies/)

Notícias

[Meta for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.meta.com%2Fblog%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Blog](/blog/)

[Casos de sucesso](/success-stories/)

Suporte

[Suporte ao desenvolvedor](/support/)

[Ferramenta de bug](/support/bugs/)

[Status da plataforma](https://l.facebook.com/l.php?u=https%3A%2F%2Fmetastatus.com%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Fórum da Comunidade de Desenvolvedores](https://www.facebook.com/groups/fbdevelopers/)

[Relatar um incidente](/incident/report/)

Quem somos

[Sobre](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2F&h=AT3troemSbOxk83ql0SJXPDa6EkD_Fzdavs6FRD8SOIyBI8gvcawqrS7wnoB94HxKGEikdLAKVf-GJZN-uhV2DNHwHen40FhlEmffHBvL8eOhOts4ph32JMjzJG5hs1Re8w1oIGA03APeQZ_VER73KXBV-YuuXIAYoLbVAjB3EE)

[Carreiras](https://www.facebook.com/careers)

Termos e políticas

[Iniciativas de plataforma responsável](/products/responsible-platform-initiatives/)

[Termos da plataforma](/terms/dfc_platform_terms/)

[Políticas do Desenvolvedor](/devpolicy/)

[Política de Privacidade](https://www.facebook.com/about/privacy)

[Cookies](https://www.facebook.com/help/cookies)

Português (Brasil)