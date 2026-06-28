---
title: "Códigos de erro - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/error-reference"
scraped_at: "2026-02-01T14:03:20.841Z"
---

# Códigos de erro

Veja abaixo os códigos de erro retornados pela API:

Código de erro

Descrição

`-`

Os códigos de erro com valor negativo são erros internos do Facebook. Confira `error_subcode` para ver o código de falha real.

`1`

Ocorreu um erro desconhecido.

`1`, subcódigo `99`

Ocorreu um erro desconhecido. Isso pode acontecer quando `level` é configurado como `adset`, sendo que o valor correto é `campaign`.

`4`

Limite de solicitações do app atingido

`10`

O app não tem permissão para essa ação

`17`

Limite de solicitações do usuário atingido

`100`

Parâmetro inválido

`100`, subcódigo `33`

Solicitação POST incompatível.

  

Esse erro pode ocorrer caso seu token de acesso não tenha sido adicionado como um [usuário do sistema com permissões adequadas](/docs/marketing-api/businessmanager/systemuser/) à conta de anúncios proprietária do Público Personalizado. Verifique a conta de anúncios no [Gerenciador de Negócios](https://business.facebook.com/home/accounts) e confirme se todos os usuários do sistema são exibidos como `Admin` na conta:

  

-   Clique em `Business Settings`
    
-   Clique na conta de anúncios
    
-   Selecione `Add people`
    
-   Pesquise por usuário do sistema e adicione os usuários que desejar como administradores
    
-   Refaça a chamada de API
    

`100`, subcódigo `1487694`

Parâmetro inválido.

  

A categoria selecionada não está mais disponível. Diversas categorias de direcionamento com base em comportamento estão obsoletas. Se você tentar usá-las para criar anúncios, as solicitações vão falhar e retornar este erro. Para ver as categorias de direcionamento disponíveis, consulte [Pesquisa de direcionamento](/docs/marketing-api/targeting-search).

`100`, subcódigo `1752129`

Parâmetro inválido.

  

Esta combinação de tarefas não é compatível. Para atribuir os recursos válidos dessa conta de anúncios a um usuário, você deve passar uma combinação de tarefas definidas no mapeamento. Consulte [Funções permitidas da API do Gerenciador de Negócios](/docs/marketing-api/businessmanager/assets#roles).

`100`, subcódigo `3858258`

A imagem não foi baixada.

Não foi possível baixar a imagem <IMAGE\_URL>. Verifique se a imagem está acessível pela internet e não está bloqueada por um robots.txt.

Talvez não seja possível acessar a imagem online, ou ela esteja sendo bloqueada por um arquivo robots.txt. Adicione uma retirada de permissão ao robots.txt para o rastreador em questão. Para mais informações, consulte [Rastreadores da web da Meta – O arquivo robots.txt](/docs/sharing/webmasters/web-crawlers#identify-4).

`102`

A chave da sessão é inválida ou não é mais válida

`104`

Assinatura incorreta

`190`

Token de acesso inválido do OAuth 2.0

`200`

Erro de permissão

`200`, subcódigo `1870034`

Termos de Públicos Personalizados não aceitos: você precisa aceitar os Termos de Públicos Personalizados antes de criar ou editar um público ou um conjunto de anúncios. Consulte [Termos de Públicos Personalizados do Facebook](https://www.facebook.com/ads/manage/customaudiences/tos).

`200`, subcódigo `1870047`

Público muito pequeno: não é possível remover usuários desse público porque isso resultará em um tamanho de público pequeno e poderá levar a uma veiculação insuficiente ou à não veiculação dos seus anúncios.

`294`

Para gerenciar anúncios, é preciso ter a permissão estendida `ads_management` e um app que esteja na nossa lista de permissão para acessar a API de Marketing.

`2606`

Não é possível exibir uma prévia do anúncio

`2607`

A moeda fornecida é inválida para ser usada com anúncios.

`2615`

Chamada inválida para atualizar esta conta de anúncios

`2654`

Ocorreu uma falha ao criar o público personalizado.

`2654` subcódigo `1713092`

Sem permissão de gravação para esta conta de anúncios. O desenvolvedor que fizer essa ligação deve ter permissões para criar um público para a conta de anúncios.

`5000`

Código de erro desconhecido

`1340029`

No momento, não é permitido excluir anúncios com criativo dinâmico. Para prosseguir, exclua o conjunto de anúncios principal.

`1373054`

Não foi possível analisar nenhum tipo de chamada para ação. Consulte a documentação sobre a API de Chamada para Ação.

`1404078`

Impedimos temporariamente você de executar esta ação.

`1404163`

Você não tem mais permissão para usar os produtos do Facebook em publicidade. Não é possível veicular anúncios, gerenciar ativos nem criar novos anúncios ou contas comerciais. [Saiba mais](https://www.facebook.com/accountquality/advertising_access?enforcement=1)

`1487007`

Você não pode editar o anúncio porque ele faz parte de um conjunto de anúncios programados que têm uma data de término expirada. Vá para a seção Orçamento e programação do conjunto de anúncios, altere a data de término para uma data futura e tente editar novamente.

`1487033`

A data de término da campanha deve estar no futuro. Escolha uma data diferente e tente outra vez.

`1487056`

O conjunto de anúncios foi excluído. Por isso, só é possível editar o nome. Se quiser editar outros campos, duplique o conjunto. Isso criará um novo conjunto de anúncios com as mesmas configurações para você aplicar as alterações.

`1487472`

```
Você está usando {msg}, que pode ser solicitado em um anúncio. Escolha outro post da Página para continuar.
```

`1487566`

A campanha foi excluída. Por isso, só é possível editar o nome. Se quiser editar outros campos, duplique a campanha. Isso criará uma nova campanha com as mesmas configurações para você aplicar as alterações.

`1487678`

O app para o qual você está tentando criar um anúncio está em um sistema operacional diferente das configurações de direcionamento do conjunto de anúncios.

`1487831`

Não é possível carregar seu conjunto de produtos. Ele pode ser inexistente ou estar inacessível por questões de privacidade.

`1487929`

O objeto que você está tentando promover é ambíguo. É preciso especificar somente um objeto promovido.

`1487990`

A conta de anúncios já tem muitos grupos de anúncios arquivados. Você precisa excluir alguns deles para poder arquivar mais.

`1815199`

A conta de anúncios não tem acesso a esta conta do Instagram. Use outra opção que esteja autorizada ou atribua uma conta de anúncios a esta conta do Instagram primeiro.

`1815629`

Todos os valores de ativos de anúncios precisam ser únicos. Verifique seus valores.

`1815694`

O usuário não tem permissão para executar a ação.

`1870065`

Esse item não pode ser usado porque contém pelo menos um público que foi desabilitado. Os públicos desabilitados foram compartilhados por contas que não estão mais ativas. Para corrigir esse problema, remova os públicos afetados.

`1870088`

O direcionamento de conexão ficará obsoleto. Remova as conexões da sua campanha para publicá-la.

`1870090`

Para criar/editar o público ou o conjunto de anúncios, concorde com os termos do público personalizado.

`1870092`

Para criar/editar o público ou o conjunto de anúncios, concorde com os termos das Ferramentas da Meta para Empresas.

`1870165`

O público tem opções de direcionamento que não podem mais ser usadas para públicos com menos de 18 anos em geral, 20 anos na Tailândia ou 21 anos na Indonésia. Aumente a idade mínima do seu público ou remova todas as opções de direcionamento, exceto localização, idade e gênero.

`1870199`

O direcionamento por localização agora alcançará as pessoas que moram ou que estiveram recentemente nas localizações selecionadas por você. Remova todos os valores do campo location\_types.

`1870219`

Somente as exclusões de empregadores podem ser salvas no controle da conta. Esse erro ocorre se você tenta salvar algo que não seja exclusão do empregador.

`1870220`

Esse erro ocorre se você tenta salvar um número maior de exclusões do empregador do que é permitido.

`1885029`

A Página selecionada para seu anúncio não corresponde àquela associada ao objeto que você está promovendo, como uma publicação da Página ou um app. As Páginas precisam ser iguais.

`1885088`

O anúncio foi arquivado e não pode ser editado. Só é possível editar o nome. Se quiser editar outros campos, duplique o anúncio. Isso criará um novo anúncio com as mesmas configurações para você aplicar as alterações.

`1885183`

A publicação do criativo dos anúncios foi criada por um app que está no modo de desenvolvimento. Ele precisa estar no modo público para criar o anúncio.

`1885204`

Você precisa definir o lance como automático ao escolher a otimização. Remova as informações de cobrança ou lance ou altere a otimização.

`1885272`

O orçamento é muito baixo.

`1885557`

O anúncio está promovendo uma publicação indisponível. Ela foi excluída, foi tirada do ar, não pertence à Página do anúncio, ou você não tem permissão para visualizar nem promover a publicação.

`1885621`

Só é possível definir um orçamento para o conjunto de anúncios ou a campanha.

`1885557`

O anúncio está promovendo uma publicação indisponível. Ela foi excluída, foi tirada do ar, não pertence à Página do anúncio, ou você não tem permissão para visualizar nem promover a publicação.

`1885650`

O orçamento é muito baixo. O valor mínimo é necessário para cobrir os gastos que ocorrerem enquanto seu orçamento é atualizado, o que pode levar até 15 minutos.

`2238055`

Não é possível transmitir instagram\_user\_id e instagram\_actor\_id ou instagram\_story\_id e source\_instagram\_media\_id nas especificações do criativo.

`2446149`

Não é possível transmitir instagram\_user\_id e instagram\_actor\_id ou instagram\_story\_id e source\_instagram\_media\_id nas especificações do criativo.

`2446307`

O limite de gastos do grupo de campanhas é inferior ao mínimo.

`2238055`

O orçamento da sua campanha deve ser de pelo menos {minimum\_budget} para cobrir todos os conjuntos de anúncios.

`2446173`

A etiqueta da regra de direcionamento com o nome {label} não se refere a nenhuma das etiquetas do ativo. Para corrigir o problema, remova todos os criativos do anúncio.

`2446289`

O {post\_type} selecionado para o anúncio não está disponível. Ele pode ter sido excluído, ou você não tem permissão para visualizá-lo. Verifique o criativo e tente novamente.

`2446347`

O anúncio de uma publicação existente deve ter a sinalização use\_existent\_post (regra padrão em "asset\_feed\_spec:target\_rules") definida como "true". Isso faz parte da solicitação POST enviada ao servidor, e não é algo que possa ser feito por meio da interface do usuário.

`2446383`

O objetivo da campanha exige um URL de site externo. Selecione uma chamada para ação e insira o URL do site na seção do criativo do anúncio.

`2446394`

O conjunto de anúncios inclui opções de direcionamento detalhado que ficaram indisponíveis ou que não estão disponíveis ao excluir pessoas de um público. Talvez seja necessário remover itens do direcionamento detalhado ou confirmar as alterações para ativá-lo novamente.

`2446509`

O tipo de destino da campanha de anúncios é inválido.

`2446580`

Não é possível especificar os componentes e o campo child\_attachments ao fornecer parâmetros interactive\_components\_spec.

`2446712`

A capacidade de criar ou veicular um conjunto de anúncios com otimização de visitas ao estabelecimento não está mais disponível. Como alternativa, escolha alcance ou otimização de vendas no local.

`2446867`

Você já atingiu o limite de {campaigns\_per\_country\_cap} campanhas de compras Advantage+ nos seguintes países: {country\_names}. Se quiser criar outras campanhas para esses países, use uma campanha de conversões padrão.

`2446880`

O número do WhatsApp conectado à sua Página do Facebook ou ao perfil do Instagram foi desconectado. Será possível veicular o anúncio novamente quando você reconectar sua conta do WhatsApp.

`2490085`

A chave de corte de 191 x 100 não estará mais disponível na versão mais recente da API de Anúncios. Recomendamos a chave de corte de 100 x 100.

`2490155`

A publicação associada ao seu anúncio não está disponível. Ela pode ter sido removida, ou talvez você não tenha permissão para visualizá-la.

`2490372`

Você precisa escolher um destino de loja para continuar.

`2490427`

O anúncio foi rejeitado na última análise e está desabilitado no momento. Para habilitá-lo, faça as atualizações necessárias e crie um novo anúncio.

`2490468`

O anúncio foi rejeitado na última análise e está desabilitado no momento. Para habilitá-lo, faça as atualizações necessárias e crie um novo anúncio.

`2708008`

Você não tem autorização para veicular anúncios sobre temas sociais, eleições ou política. Peça a um usuário autorizado da conta de anúncios que habilite o anúncio ou conclua o processo de confirmação de identificação por conta própria em https://www.facebook.com/id.

`2859015`

Impedimos temporariamente você de executar esta ação.

`3858064`

A campanha tem opções que não podem ser mais usadas para públicos menores de 18 anos em geral, 20 anos na Tailândia ou 21 anos na Indonésia. Aumente a idade mínima do seu público ou remova todas as opções de direcionamento, exceto idade e localizações que sejam cidades ou regiões maiores (sem incluir códigos postais).

`3858082`

O criativo está qualificado para os aprimoramentos padrão, mas o enroll\_status não foi fornecido. Decida se quer ou não ativar os aprimoramentos padrão. Saiba mais [aqui](https://l.facebook.com/l.php?u=https%3A%2F%2Ffburl.com%2Fhyth50xo&h=AT2qFhOjnzNVBeMpJc807RIjlkDy-s1hQafwVqhzQNnK1UzEvPIdW3K2h2Ui_76-TvzCn20sh8PHFHSvt5WJEmtUeCz8hkaRVaDLxRyIgtgzJ0gfNw17HxrdXnHrEr6TaZOoVtjRuh7HFfsjHtyb0mySfm6Q6-hBm2qXo0SQj_A)

`3858504`

O criativo não deve incluir aprimoramentos padrão. A partir da API v22.0, o opt-in/out de `standard_enhancements` foi descontinuado. Recrie o criativo sem o campo `standard_enhancements` no `degrees_of_freedom_spec`. Use features individuais do Advantage+ Creative se necessário.

`3858152`

O anúncio pertence a um conjunto que precisa ser publicado com informações de beneficiário e pagador. Acesse o conjunto de anúncios para adicionar ou revisar essas informações. Depois, clique em "Publicar".

`3867105`

Esse conteúdo não pode ser usado no anúncio em parceria. Selecione outro conteúdo.

`3910001`

Estamos enfrentando alguns problemas com sua conta. Tente novamente mais tarde.

O gerenciamento de erros deve ser feito somente por meio dos códigos de erro. A string Descrição está sujeita a mudanças sem aviso prévio.

## blame\_field\_specs

Esta é uma propriedade incluída no blob `error_data` de todas as chamadas de API que resultarem em um erro de validação. Ela indica quais campos são responsáveis por esse erro. Isso pode ser usado para fornecer erros contextuais, por exemplo, exibir um erro ao lado do campo com falha na interface gráfica do usuário de uma ferramenta de criação de anúncios.

`blame_field_specs` é uma matriz em que cada elemento é um `blame_field_spec` que, por sua vez, indica um campo único da especificação da API responsável pelo erro.

Um `blame_field_spec` também é uma matriz que indica o nome do campo com falha, bem como a localização do campo, na especificação geral da API fornecida.

### Exemplos:

#### Campo único com falha

```
{  
  "error":{  
    "type":"Exception",
    "message":"The budget for your Ad-Set is too low.  It must be at least $1.00 per day.",
    "code":1487901,
    "is_transient":false,
    "error_data":{  
      "blame_field_specs":[  
        ["daily_budget"]
      ]
    }
  }
}
```

Indica que o campo `daily_budget` da especificação da API tem uma falha e que, nesse caso, tem um valor muito baixo.

#### Diversos campos com falha

```
"blame_field_specs":[  
  ["targeting_spec", "interested_in"], 
  ["bid_info", "impressions"]
]
```

Indica que há um erro relacionado ao subcampo `interested_in` dentro de `targeting_spec` da especificação da API, e que o erro também está relacionado ao campo `impressions` dentro de `bid_info` da especificação da API.