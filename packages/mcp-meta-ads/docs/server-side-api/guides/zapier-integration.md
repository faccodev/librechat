---
title: "Integração via Zapier - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/server-side-api/guides/zapier-integration"
scraped_at: "2026-02-01T15:50:27.213Z"
---

# Integração via Zapier

Você pode usar a plataforma de automação Zapier para enviar eventos à API de Conversões. Use o app Zapier do Facebook para enviar eventos automaticamente sempre que houver alterações na sua fonte de dados.

## Visão geral

O Zapier é uma ferramenta de automação online que pode ser usada para conectar dois ou mais apps. No caso abordado aqui, conectaremos dois apps. No primeiro app, você seleciona um evento de gatilho que gera um evento de ação no segundo app. O primeiro app pode ser qualquer fonte de dados que você esteja utilizando. O segundo app deve ser [Conversões do Facebook](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Fapps%2Ffacebook-conversions%2Fintegrations&h=AT33XrY5e1UWZSvxu6Y8qL4kG7EAC_xbvGIniunkGjkc3u_SshV9pnh9YMFymgcUsVVLCYiymj2gvh4gx2OHKTkst_md-f6JtYbykRnjHjDz1q2Q9Ekzow8QBE9rha-rJjAqFIPbp_goQFXyf5WViL3YXWIxcq4w8ZmvRUftXjE).

Depois que a conexão estiver configurada, sempre que sua fonte de dados for disparada, nosso app enviará um evento para a API de Conversões. Por exemplo, sempre que uma nova compra for adicionada à sua fonte de dados, esse evento será postado na nossa API.

[](#)

## Como usar

#### Etapa 1

Acesse [zapier.com](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2F&h=AT3lgdHAssbPlDdeDF8I5feEzEWb1hMbDSPz4dhk94U4SxIcNiF1qhAmAny_ZnneHpf7J20Q6aXahHbPt-Q62Ee0Mg6kBlmdcVHBUGUfRr-zusrZNGh2m84n1iBdFYusRpQ53kpKEoV7Kmvq1S9KvW0QpRu6d4BWcnYTmiJrNtE). Depois, cadastre-se ou entre com credenciais existentes. No menu do lado esquerdo, clique em **Make a Zap**.

#### Etapa 2: selecione a fonte de dados e o gatilho

Depois, o Zapier solicitará que você configure o gatilho. Em **When this happens**, escolha **App** e **Trigger Event**.

Aqui, o app é a fonte de dados. Um exemplo seria [Planilhas Google](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Fapps%2Fgoogle-sheets%2Fintegrations&h=AT3llGWRPaqVPrxCHiyyEMQS7mvSpxFv9FJoW-UBWBp5yZ-gY_oxP2R_aDInoVAA7C5eq19z62Jil395OM-3Fk_WfvjeAEtcixbxKMIoveZ740qp1Smmg_RCT9FCp4w0UUKu8x7pWC7sCJOl7QbjaNXgyI0PTw3O840Xgen8VzE).

O evento de gatilho referencia a ação que deve acontecer na sua fonte de dados para que a automação seja disparada. Se usarmos o exemplo do Planilhas Google, estes seriam alguns dos possíveis eventos de gatilho do Zapier:

-   New Spreadsheet Row: disparado quando uma nova linha é adicionada ao final de uma planilha.
    
-   New or Updated Spreadsheet Row: disparado quando uma nova linha é incluída ou modificada em uma planilha.
    

Selecione o evento de gatilho do Zapier que melhor atende às suas necessidades de publicidade.

Você precisa configurar sua fonte de dados para corresponder ao esquema de eventos do Facebook.​ Para o Planilhas Google, defina os campos da planilha para que correspondam com nossos campos de eventos.

#### Etapa 3: selecione os eventos a serem postados

Depois de concluir o processo **When this happens**, você pode configurar a segunda parte da automação em **Do this**. Novamente, será preciso selecionar **App** e **Action Event**.

Aqui, o **app** deve ser [Conversões do Facebook](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Fapps%2Ffacebook-conversions%2Fintegrations&h=AT1StXlCk4NdeKSH7OtyNcj2f78w24SGZYE-rqpplKE1mLf8tE-RoSeFz4lkoRKW0y6v43R--pk-3ZzEOBjN0L6JYWuUHD-AlqtGGhOZxB0BBQ5P263pcVqhLcwvlG8mwNBrgyGjt9C0PfsHnxcStTrdewjQ01yrd6MuirPgsMU). Esse é o destino de envio das informações provenientes da sua fonte de dados.

Eventos de ação são os eventos que você quer enviar para nossa API. Alguns exemplos são compra, cadastro e outros eventos. [Confira aqui uma lista de eventos padrão do Pixel da Meta](/docs/facebook-pixel/reference#standard-events). Você também pode enviar eventos personalizados.

#### Etapa 4: ativar o Zap

Agora você pode ativar seu Zap. Quando essa etapa for concluída, um evento será postado na API de Conversões sempre que o evento de gatilho acontecer.

Para finalizar, no exemplo do Planilhas Google, criamos um Zap que:

-   usa uma planilha Google como fonte de dados;
    
-   tem "New Spreadsheet Row" como um evento de gatilho;
    
-   tem `Purchase` como um evento de ação.
    

Assim que esse Zap for ativado, um evento de compra será postado na nossa API sempre que uma nova linha for adicionada à planilha.

[](#)

## Recursos

-   [The Zapier automation quick-start guide](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Flearn%2Fgetting-started-guide%2F&h=AT3AXdUlBcbQ2anSulh66Y0upMy8Cln8DpKEEQw0oW5QHmgKLkjVZ-dZYd0Af9XULSWnpzsIjSF6aceyZgkw1V4ihYFGvyVRb7uP-t90PKMW8k6RkirZ84ald0FLKC4wulm3Sj6dBhTwlPW9VcBVnQl1WFoTC9KykYsuQLHv5og)
    
-   [App tips](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Fblog%2Fcategories%2Fapp-tips%2F&h=AT0NcUXrDfCJtXnvRXj3jrEMYIfiNozv5MZs_-_N4u2t6gaGj5IdhEYO-81UWBZ-VBR_uz9weO1nTjh2st5SGkYp2UVygp_gR7_DT9BYqLy7DVvta-NbacNa06dxK4P4GZh-uzD8iG_f9AF8geVjaiqkoT604vjxTTCtwf6AZe0)
    

[](#)