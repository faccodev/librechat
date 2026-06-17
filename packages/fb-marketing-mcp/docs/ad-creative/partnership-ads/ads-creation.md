---
title: "Criação de anúncios em parceria - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/partnership-ads/ads-creation"
scraped_at: "2026-02-01T14:13:40.131Z"
---

# Criação de anúncios em parceria

Os anúncios de conteúdo de marca agora são chamados de anúncios em parceria.

Com os anúncios em parceria, os anunciantes exibem anúncios com criadores de conteúdo, marcas e outras empresas. Os anúncios mostram a conta do anunciante e do parceiro no cabeçalho e aproveitam os sinais das duas contas para melhorar a classificação e o desempenho.

Os criadores de conteúdo ou parceiros precisam ter uma [conta profissional](https://l.facebook.com/l.php?u=https%3A%2F%2Fhelp.instagram.com%2F138925576505882&h=AT13uXzCC-tt2XXN2C2d_ypWTb_HFGFTA9_HY0bGqgppMy4YpN1lFNeNcER_Kwtx1BUTjpw5N2sEMZXKUNZ-QpGZ5KZXgJm13LaUZq-n2aZSz5Zyfm4qUDwrmNsT0Wql5yIJESjGts3-RvXVpYFejvHRDHMeXwjjSNGMt_JaDfA) no Instagram para usar anúncios em parceria e atender aos requisitos para [conteúdo de marca e anúncios em parceria no Instagram](https://l.facebook.com/l.php?u=https%3A%2F%2Fhelp.instagram.com%2F1372533836927082&h=AT391YTzlE5gwUNY5mt_5qR_SZjy6yduciWS-MGnI7NVD1BJZn_C871FdV_QilIzbJm7mEMDEzrzwLpEUFZboMYqdm_keU4GEVXbRvDV7feI512JiK3JYU7BY744iyVMwNzCAiCs1hSmSOnWfto2RMpVFSPoriuOm2B-SOGLv7U) e [anúncios em parceria no Facebook](https://www.facebook.com/business/help/906775900606811).

Por meio das [APIs com permissões no nível da conta de anúncios em parceria](/docs/instagram-api/guides/branded-content/account-level-permissioning), os anunciantes podem gerenciar relações de anúncios em parceria com seus parceiros no nível da conta e veicular anúncios em parceria sem permissões adicionais no nível do conteúdo.

**Observação:** se duas contas do Instagram/Facebook forem de propriedade da mesma empresa e um funcionário tiver acesso aos anúncios de ambos os ativos, será possível veicular anúncios em parceria sem a necessidade de permissões.

Siga as instruções abaixo se não houver permissão entre o anunciante e o parceiro no nível da conta. Para ver mais informações, consulte [Post-Level Permissioning](/docs/instagram-api/guides/branded-content/post-level-permissioning).

-   Use um código de anúncio em parceria para criar um anúncio usando as APIs de criação de anúncios.
    
-   Peça que os criadores de conteúdo deem aos anunciantes permissão para promover posts de conteúdo orgânico de marca como anúncios em parceria (aplicável apenas a posts de conteúdo orgânico de marca).
    

## Antes de começar

Você precisará do seguinte:

-   A identificação da conta profissional do Instagram da sua marca
    
-   O nome de usuário da conta profissional do Instagram (opcional)
    
-   Um token de acesso à Página solicitado por uma pessoa que pode executar a tarefa `ADVERTISE` na Página vinculada à conta profissional do Instagram
    
-   As seguintes permissões:
    
    -   `ads_management`
        
    -   `business_management`
        
    -   `instagram_basic`
        
    -   `instagram_branded_content_ads_brand`
        
    -   `pages_read_engagement`
        
    -   `pages_show_list`
        
    
-   Para obter mídia e criar anúncios em nome de uma conta profissional do Instagram que não é sua nem é administrada por você, será preciso ter **acesso avançado** para todas as permissões.
    
-   O anunciante precisa da permissão `create_ads` para criar anúncios em uma conta do Instagram.
    
-   Para que o anúncio seja veiculado, o criador de conteúdo precisa aprovar as [permissões no nível da conta de anúncios em parceria](/docs/instagram-api/guides/branded-content/account-level-permissioning).
    
-   Se o anunciante publicar o anúncio sem permissões, o anúncio será publicado com estado de veiculação pendente. O criador receberá uma solicitação da marca para aprovar as permissões. Depois da aprovação, o anúncio começará a ser veiculado.
    

### Requisitos

-   O criador do conteúdo de marca precisa ter [habilitado a mídia para a criação de anúncio](https://developers.facebook.com/docs/instagram-api/guides/branded-content/post-level-permissioning).
    
    OU
    
-   A marca deve ter aprovado a [permissão no nível da conta com o criador](https://developers.facebook.com/docs/instagram-api/guides/branded-content/account-level-permissioning).
    

[](#)