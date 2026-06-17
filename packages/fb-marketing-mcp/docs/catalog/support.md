---
title: "Suporte - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/support"
scraped_at: "2026-02-01T14:08:54.589Z"
---

# Solucionar problemas no seu feed de dados

Use estas soluções e diretrizes para resolver problemas com seu feed de dados.

## Ver regras sugeridas

Para listar todas as regras associadas a um feed de dados, faça uma chamada `HTTP GET` para:

```
https://graph.facebook.com/<API_VERSION>/<PRODUCT_FEED_ID>/rules
```

Para saber mais, consulte a [referência sobre a API de Regras do Feed de Dados de Produtos](/docs/marketing-api/reference/product-feed/rules/).

Você pode obter sugestões de regras da Meta para corrigir erros no seu feed de dados. Se quiser ver as regras sugeridas para sua sessão de carregamento, siga estas etapas:

**Etapa 1** – Recuperar as sessões de carregamento:

```
https://graph.facebook.com/<API_VERSION>/<PRODUCT_FEED_ID>/uploads
```

**Etapa 2** – Recuperar os erros na sessão de carregamento:

```
https://graph.facebook.com/<API_VERSION>/<UPLOAD_SESSION_ID>/errors
```

**Etapa 3** – Recuperar as regras sugeridas para um erro de carregamento:

```
curl -i -X GET 
 "https://graph.facebook.com/<API_VERSION>/<UPLOAD_ERROR_ID>/suggested_rules?access_token={ACCESS_TOKEN}
```

**Exemplo de resposta**

```
"data": [
  
    "attribute": "description",
    "type": "letter_case_rule",
    "params": [
      
        "key": "type",
        "value": "capitalize_first"
      
    ]
  
]
```

Para obter mais detalhes, consulte a [referência sobre a API de Regras Sugeridas](/docs/marketing-api/reference/product-feed-rule-suggestion/).

[](#)

## Aplicar regras aos feeds de dados

Para aplicar regras a um feed de dados, é necessário associar a regra ao feed em questão.

Faça uma chamada `HTTP POST` para:

```
https://graph.facebook.com/<API_VERSION>/<PRODUCT_FEED_ID>/rules?attribute={ATTRIBUTE}&amp;rule_type={RULE_TYPE}&amp;params={PARAMS}
```

**Exemplo**

```
curl -i -X POST 
  -d "attribute=google_product_category" 
  -d "rule_type=mapping_rule" 
  -d "params=%7B'map_from'%3A%20'gcategory'%7D" 
  -d "access_token={ACCESS_TOKEN}" 
  "https://graph.facebook.com/<API_VERSION>/{PRODUCT_FEED_ID}/rules"
```

**Exemplo de resposta**

```
"id": "{RULE_ID}"
```

Formate `params` conforme indicado abaixo:

Tipo de regra

Formato

Exemplo

Observações

Regra de mapeamento

"map\_from": <string>

"map\_from": "gavailability"

Regra de mapeamento de valor

<string> : <string>

"InStock": "in stock"

Número máximo permitido: 10 para mapeamentos e 20 para o comprimento de strings.

Regra do uso de letras maiúsculas e minúsculas

"type": uma destas opções : "capitalize\_first", "capitalize\_all", "to\_upper", "to\_lower"

"type": "capitalize\_first"

Para saber mais, consulte a [referência sobre a API de Regras do Feed de Dados de Produtos](/docs/marketing-api/reference/product-feed/rules/).

[](#)

## Corrigir erros de carregamento do feed com regras

Use as regras para corrigir e evitar erros recorrentes no carregamento do feed de dados. Você pode fornecer regras aplicadas pela Meta a cada carregamento do feed de dados. Especifique suas regras pelo atributo (coluna) ao qual elas devem ser aplicadas, pelo tipo de regra e pelos parâmetros. **No momento, não é possível usar regras com a API em lote.** Você pode fornecer estes tipos de regras:

-   **Regra de mapeamento** – Mapeia atributos (nomes de colunas) em um arquivo de feed de dados para atributos que podemos reconhecer.
    
-   **Regra de mapeamento de valores** – Mapeia campos (valores de colunas) em um arquivo de feed de dados para campos que podemos reconhecer.
    
-   **Regra do uso de letras maiúsculas e minúsculas** – Define o uso de letras maiúsculas ou minúsculas em um campo. Por exemplo, alterar todas as descrições escritas em maiúsculas para minúsculas.
    

Você pode corrigir estes problemas com as **regras de mapeamento e mapeamento de valores**:

-   Erros de digitação em atributos: mude de `gavailability` para `availability`.
    
-   Enumerações não reconhecidas: mude de `InStock` para `in stock`.
    
-   Formatação de preço: mude de `45$` para `45.00 USD`.
    
-   Condição de tradução: mude de `Neu` para `New`.
    

Você pode usar a **regra do uso de letras maiúsculas e minúsculas** para resolver estes tipos de problemas:

-   Alteração de descrições: mude o formato que exibe todas as letras maiúsculas `BRAND NEW WITH LEATHER DETAIL...` para `Brand new with leather detail...`.
    
-   Correção de títulos: mude o formato que exibe todas as letras maiúsculas `FACEBOOK T-SHIRT` para `Facebook T-shirt`.
    

[](#)

## Atualizar e excluir regras

Se você quiser alterar uma regra associada a um feed de dados, faça uma chamada `HTTP POST` para atualizar todos os parâmetros. Para excluir a regra, use uma solicitação `HTTP DELETE`. **Só é possível atualizar os parâmetros. Se você quiser alterar o `attribute` ou o `rule_type`, será preciso excluir e recriar a regra.**

```
https://graph.facebook.com/<API_VERSION>/<PRODUCT_FEED_RULE_ID>?params={PARAMS}
```

Para saber mais, consulte a [referência sobre a API de Regras do Feed de Dados de Produtos](/docs/marketing-api/reference/product-feed-rule/).

[](#)

## Corrigir itens ausentes em um catálogo

Se o Gerenciador de Comércio informar que alguns itens no catálogo estão ausentes ou não podem ser encontrados, talvez seja necessário verificar se o pixel ou o app da Meta foi configurado corretamente. Esse erro pode ocorrer nos cenários a seguir:

-   O `content_id` incluído no seu pixel ou evento do app não corresponde à identificação no feed de dados do catálogo.
    
-   O pixel ou o app não está associado ao catálogo.
    
-   O item não existe no catálogo.
    

Saiba mais [aqui](https://www.facebook.com/business/help/644889989181423).

Para saber mais sobre como resolver problemas no seu feed, acesse o [Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fcollection%2F240330%2Fpath%2F210150%3Fcontent_id%3DUHg8KZLJqKp7LPU&h=AT0dDLJz4SaCNJckZZYbRW_HJBEovHkg2eLV7jsTLYsWkvI0w3ondyO6moAgEDIsVJk900Y_KSCPQwCSsSFUmKofNGf7G5LCOD3PtYaqhRF-Fl6QpIRFJc5ITAOuiVVr3ldNhOK750tA2Ki8IHPyiU1B5HdUFQziWl6W-2gTk8E).

[](#)

## Solicitar um relatório de erros de carregamento do feed de dados

### Anúncios de catálogo Advantage+

Você pode usar a API de Relatório de Erros de Carregamento do Feed de Dados para solicitar um relatório de erros completo a respeito de qualquer sessão de carregamento do feed. Assim que recebermos a solicitação, executaremos um trabalho em segundo plano para preparar esses erros e armazená-los em um arquivo CSV.

Para solicitar um relatório de erros completo, use `POST /{upload_session_id}/error_report`.

O relatório conterá estas informações:

-   A identificação do varejista cujo item gerou um erro.
    
-   Uma mensagem de erro.
    
-   A gravidade do erro: `FATAL` (caso o erro tenha gerado a rejeição do item) e `WARNING` (se o item tiver sido carregado apesar do erro).
    
-   Os nomes de campos nos quais o erro foi gerado.
    
-   As funcionalidades que estão sendo afetadas pelo erro (por exemplo, anúncios de catálogo Advantage+ que contêm `'da'` na coluna).
    
-   Uma sinalização sobre o bloqueio do recurso (`true`/`false`); por exemplo, o erro impede que o item seja exibido na plataforma.
    

**Solicitação**

```
curl -i -X POST \
  -F 'access_token=ACCESS_TOKEN' \
  https://graph.intern.facebook.com/<API_VERSION>/<upload session ID>/error_report
```

**Resposta** – A resposta indica se a solicitação foi bem-sucedida ou não:

```
{
  "success": bool,
}
```

### Comércio

Em geral, obter uma amostra de erros e avisos é suficiente para corrigir a maioria dos problemas de carregamento do feed de produtos. No entanto, você pode precisar da lista completa de erros para fazer análises mais profundas. Para baixar essa lista de erros e avisos, você deve primeiro consultar a sessão de carregamento mais recente (veja a seção acima).

É possível solicitar que o relatório de erros completo seja gerado para um determinado ID de sessão de carregamento.

**Solicitação**

```
GET https://graph.facebook.com/vX.X/{upload-session-id}/?fields=error_report
```

**Resposta**

```
{
  "error_report": {
    "report_status": "WRITE_FINISHED",
    "file_handle": "{link-to-the-file-location}"
  },
  "id": "493476498092860"
}
```

Você deve encontrar uma URL que permita o download (por exemplo, com wget, curl e assim por diante). O arquivo baixado conterá o relatório de erros completo.

Se você receber o erro "Cannot access an object not managed by the business owning this app", verifique se o app usado pertence à empresa (**Business Settings** > **Account** > **Apps**).

Caso o relatório não esteja pronto, repita a última chamada após alguns segundos. Depois, será possível baixar o relatório.

[](#)

## Obter o status do relatório de erros

Depois de fazer a solicitação, use `GET /{upload_session_id}?fields=error_report` para obter o status do relatório.

**Exemplo**

```
curl -i -X GET \
 https://graph.intern.facebook.com/<API_VERSION>/<upload session ID>?fields=error_report&access_token=ACCESS_TOKEN
```

**Resposta**

```
{
  "error_report": {
    "report_status": string,
    "file_handle": string, // if available
  }
  "id": "332552650711532 (https://developers.intern.facebook.com/tools/explorer/690422434302374?method=GET&path=332552650711532%3Ffields%3Derror_report&version=v3.2#)"
}
```

#### Valores possíveis – Status retornado

  

Valor

Descrição

`NOT_REQUESTED`

O relatório de erros referente ao carregamento do feed de dados não foi solicitado.

`REQUESTED`

A solicitação foi recebida e está sendo processada.

`CREATED`

O relatório foi criado e agora é preciso aguardar até que as informações sejam registradas em um arquivo CSV.

`WRITE_FINISHED`

O arquivo do relatório foi preparado e está pronto para ser baixado.

`SESSION_DATA_NOT_FOUND`

Não foram encontrados dados referentes à sessão de carregamento do feed. É provável que não haja itens processados para o carregamento em questão.

`ERROR_REPORT_OUTDATED`

O relatório de erros tem mais de 30 dias e está indisponível.

`FATAL_ERROR`

Algo deu errado durante o processo de preparação do relatório de erros. Você pode fazer uma solicitação para tentar novamente.

**Observação**: uma URL de CDN que usa o relatório de erros em questão poderá ser baixada e será retornada como "file\_handle" quando o status do `error_report` for `WRITE_FINISHED`.

[](#)

## Gerenciar erros de carregamento do feed de produtos

### Anúncios de catálogo Advantage+

Leia a [documentação sobre erros de carregamento do feed de produtos](/docs/marketing-api/reference/product-feed-upload/errors/). Veja também [como lidar com erros de carregamento do feed de produtos na seção Comércio](#errors-commerce).

#### Solicitação

Para obter erros e avisos de um carregamento de feed, primeiro você deve consultar as sessões recentes de carregamento.

```
GET https://graph.facebook.com/vX.X/{product-feed-id}/uploads
Token: PAGE_ACCESS_TOKEN
```

Depois, use o `upload_session_id` para recuperar erros e avisos.

```
GET https://graph.facebook.com/vX.X/{upload-session-id}/errors
Token: PAGE_ACCESS_TOKEN
```

#### Exemplo de resposta

Aqui, uma gravidade do tipo `fatal` significa que o item não pode ser processado pela Meta; uma gravidade do tipo `warning` indica que alguns atributos recomendados estão ausentes ou incorretos.

```
{
  "data": [
    {
      "id": 1510567479166488,
      "summary": "A required field is missing: price.",
      "description": "Products need to have prices to run in ads. Include a price for each product in your data feed file and upload it again. Prices must include cost and an ISO currency code (for example: 10 USD instead of $10 for American dollars).",
      "severity": "fatal",
      "samples": {
        "data": [
          {
            "row_number": 2,
            "retailer_id": "yj9bpbpub5t8t22kgbq6",
            "id": "1677559492523068"
          },
          {
            "row_number": 5,
            "retailer_id": "ujn33tvbyv2vmdpo7ecb",
            "id": "1529743440653137"
          }
        ]
      }
    },
    {
      "id": 275241589314958,
      "summary": "GTIN is incorrectly formatted",
      "description": "Check that the GTIN (Global Trade Identification Number) for each of your products is in the correct format. Accepted types include UPC, EAN, JAN, and ISBN.",
      "severity": "warning",
      "samples": {
        "data": [
          {
            "row_number": 4,
            "retailer_id": "bxwb1pho9o43uxjxikcg",
            "id": "538700559625644"
          }
        ]
      }
    }
  ]
}
```

### Comércio

Leia a [documentação sobre erros de carregamento do feed de produtos](/docs/marketing-api/reference/product-feed-upload/errors/). Veja também [como gerenciar erros de carregamento do feed de produtos na seção Anúncios de catálogo Advantage+](#errors-da).

Recomendamos que você confira os erros e avisos após cada sessão de carregamento do catálogo. Para isso, vá até a seção **Diagnostics** do [Gerenciador de Comércio](https://business.facebook.com/products) ou use a API de Feed para solicitar uma amostragem de erros e avisos. Comece consultando as sessões recentes de carregamento.

Saiba mais sobre como resolver avisos e erros exibidos na seção Diagnostics do Gerenciador de Comércio no [Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fcollection%2F240330%2Fpath%2F210150%3Fcontent_id%3DUHg8KZLJqKp7LPU&h=AT3msSSOvGFKciUM_vc3c66ZFy3oHA-qVlAyZmJU4YZF9QcUN3N3Zycl-wxrLlwG9xHvBRUdjFGWmaIysdFlNV9cvcx80EaBHQnQDUVYOsTEsgjIdML_kV0oskAAOk6jx2UUS5Qzwz7q878lTJhDn57huTnArFnsocQLzhPAyvg).

#### Solicitação

```
GET https://graph.facebook.com/vX.X/{product-feed-id}/uploads
```

#### Exemplo de resposta

```
{
  "data": [
    {
      "id": "493476498092860",
      "start_time": "2019-07-15T12:38:36+0000",
      "end_time": "2019-07-15T12:38:47+0000"
    }
  ]
}
```

Depois, use o valor retornado no campo `id` para gerar **uma amostragem** de erros e avisos.

#### Solicitação

```
GET https://graph.facebook.com/vX.X/{upload-session-id}/errors
```

#### Exemplo de resposta

Aqui, uma gravidade do tipo `fatal` significa que o item não pode ser processado pela Meta; uma gravidade do tipo `warning` indica que alguns atributos recomendados estão ausentes ou incorretos.

```
{
  "data": [
    {
      "id": 1510567479166488,
      "summary": "A required field is missing: price.",
      "description": "Products need to have prices to run in ads. Include a price for each product in your data feed file and upload it again. Prices must include cost and an ISO currency code (for example: 10 USD instead of $10 for American dollars).",
      "severity": "fatal",
      "samples": {
        "data": [
          {
            "row_number": 2,
            "retailer_id": "yj9bpbpub5t8t22kgbq6",
            "id": "1677559492523068"
          },
          {
            "row_number": 5,
            "retailer_id": "ujn33tvbyv2vmdpo7ecb",
            "id": "1529743440653137"
          }
        ]
      }
    },
    {
      "id": 275241589314958,
      "summary": "GTIN is incorrectly formatted",
      "description": "Check that the GTIN (Global Trade Identification Number) for each of your products is in the correct format. Accepted types include UPC, EAN, JAN, and ISBN.",
      "severity": "warning",
      "samples": {
        "data": [
          {
            "row_number": 4,
            "retailer_id": "bxwb1pho9o43uxjxikcg",
            "id": "538700559625644"
          }
        ]
      }
    }
  ]
}
```

[](#)

## Saiba mais

-   [Solucionar erros de feed de dados no catálogo](https://www.facebook.com/business/help/2041876302542944)
    
-   [Qualidade do catálogo e dos sinais](https://developers.facebook.com/docs/marketing-api/dynamic-ad/catalog-and-signals-quality/)
    
-   [Campos e especificações do feed de dados para catálogos no Gerenciador de Comércio](https://www.facebook.com/business/help/120325381656392)
    
-   [Qualidade do catálogo e dos sinais](https://developers.facebook.com/docs/marketing-api/dynamic-ad/catalog-and-signals-quality/)
    
-   [API em lote de catálogo: anúncios de catálogo Advantage+](https://developers.facebook.com/docs/marketing-api/catalog-batch)
    
-   [API em lote de catálogo: catálogos de comércio](https://developers.facebook.com/docs/marketing-api/catalog-batch#batch-api-commerce)
    
-   [Referência sobre o feed de dados](https://developers.facebook.com/docs/marketing-api/reference/product-feed)
    
-   [Referência sobre os feeds de dados no catálogo](https://developers.facebook.com/docs/marketing-api/reference/product-feed)
    
-   [Referência sobre a API de Feed](https://developers.facebook.com/docs/marketing-api/reference/product-feed)
    
-   [Referência sobre a busca programada do feed de dados](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog/update-options#scheduled-feed-fetches)
    
-   [Referência sobre as regras de filtro](https://developers.facebook.com/docs/marketing-api/reference/product-set/#filterrules)
    
-   [Referência sobre o lote de catálogos de produtos](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/batch/)
    
-   [Referência sobre o lote de itens de catálogos de produtos](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/)
    
-   [Referência sobre o status de solicitação em lote de verificação de catálogo de produtos](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/check_batch_request_status/)
    
-   [Referência sobre a programação do feed de produtos](https://developers.facebook.com/docs/marketing-api/reference/product-feed-schedule)
    
-   [Referência sobre o carregamento do feed de produtos](https://developers.facebook.com/docs/marketing-api/reference/product-feed/uploads/)
    
-   [Referência sobre o item do produto](https://developers.facebook.com/docs/marketing-api/reference/product-item)
    
-   [Referência sobre a pesquisa de produtos no catálogo](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/products)
    
-   [Treinamento ao vivo sobre catálogo: Meta Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fcollection%2F240330%2Fpath%2F210150%3Fcontent_id%3D3AB46yBUG6YtkZC&h=AT2YyC7Sqim1h7bh0meUSltNp3XbI5xc7M20i2QxpFMQiWLbUso_6IN81S9WYKy6c2NygDIkL3NG_j_VCd88a-xZYlgP7zAvL3B02zVbm93pn2DV5KkpcRkmMg4RSgXz0ujNAHJ48fk0rop3WOxzyIk_fMMrlGi93lfLIt-RJZ8)
    

[](#)