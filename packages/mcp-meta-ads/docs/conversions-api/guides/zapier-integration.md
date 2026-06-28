---
title: "Integração via Zapier - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/guides/zapier-integration"
scraped_at: "2026-02-01T15:49:43.511Z"
---

# Integração via Zapier

Você pode usar a plataforma de automação Zapier para enviar eventos à API de Conversões. Use o app Zapier do Facebook para enviar eventos automaticamente sempre que houver alterações na sua fonte de dados.

## Visão geral

O Zapier é uma ferramenta de automação online que pode ser usada para conectar dois ou mais apps. No caso abordado aqui, conectaremos dois apps. No primeiro app, você seleciona um evento de gatilho que gera um evento de ação no segundo app. O primeiro app pode ser qualquer fonte de dados que você esteja utilizando. O segundo app deve ser [Conversões do Facebook](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Fapps%2Ffacebook-conversions%2Fintegrations&h=AT32zu8K9ag4dqsZcnMpc-0VUVuZZDNROK175lnMDkOdaJDmhu1TRPekEUJCFhxjyIGAdYVBHtMkRFhAmEqnInEu6iWaPrSraxGkl41j_L3_NgccCnnNvipz19DzcFrDt6oNusjqVBoz3izSZ7LZqDuvXpEzIDbDFU-u_WAhrsI).

Depois que a conexão estiver configurada, sempre que sua fonte de dados for disparada, nosso app enviará um evento para a API de Conversões. Por exemplo, sempre que uma nova compra for adicionada à sua fonte de dados, esse evento será postado na nossa API.

[](#)

## Como usar

#### Etapa 1

Acesse [zapier.com](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2F&h=AT1WX2UrDhwbd2I2SQvAIEJLi0fe-2bLn4GqTlWMHnqAYOvaR0LTCOm_JEo_Zjo21bjvl_fbnib3gN5d-O9MA02rrFgEcch9JWCal70mNXVcmMmgvkN_uzTSmVDW4nVleq5sCnXrYvO1eLOyfLVFr4xOkUXuDS3ss_dR-CgYeeklHfec8Wc8iPa0). Depois, cadastre-se ou entre com credenciais existentes. No menu do lado esquerdo, clique em **Make a Zap**.

#### Etapa 2: selecione a fonte de dados e o gatilho

Depois, o Zapier solicitará que você configure o gatilho. Em **When this happens**, escolha **App** e **Trigger Event**.

Aqui, o app é a fonte de dados. Um exemplo seria [Planilhas Google](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Fapps%2Fgoogle-sheets%2Fintegrations&h=AT0a94GhyhNar3c5Jm3hyy_fHNXq6duv6n3BKuW4nXBIX-EU10tcEaMH0r6l41bpVebimn8gBaVwO_y7eXRwMIhPt_fNusZX2eqr0j_lECVBP_ywc61eu6Nsl_LnAJo73ZvCGvcEKlfDAUH0zZg0EFcfR7wGqs19c4SuzB17XKo).

O evento de gatilho referencia a ação que deve acontecer na sua fonte de dados para que a automação seja disparada. Se usarmos o exemplo do Planilhas Google, estes seriam alguns dos possíveis eventos de gatilho do Zapier:

-   New Spreadsheet Row: disparado quando uma nova linha é adicionada ao final de uma planilha.
    
-   New or Updated Spreadsheet Row: disparado quando uma nova linha é incluída ou modificada em uma planilha.
    

Selecione o evento de gatilho do Zapier que melhor atende às suas necessidades de publicidade.

Você precisa configurar sua fonte de dados para corresponder ao esquema de eventos do Facebook.​ Para o Planilhas Google, defina os campos da planilha para que correspondam com nossos campos de eventos.

#### Etapa 3: selecione os eventos a serem postados

Depois de concluir o processo **When this happens**, você pode configurar a segunda parte da automação em **Do this**. Novamente, será preciso selecionar **App** e **Action Event**.

Aqui, o **app** deve ser [Conversões do Facebook](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Fapps%2Ffacebook-conversions%2Fintegrations&h=AT111jIDX7TOfFlIJ4mlN_QVgJKld0yRv_QQA8TOiX30Yzg2AS9zna_OIKhZgyINz88G7G6jLgqZ_2pGLcsv9_rE3uX-mueLB1nIL3cFg4v4OO4FTI_Om2q6_uoYgH6dGPH2h0KGZOse0A8pZisB6MS1-9AEzSdkg4w6Eq4tONw). Esse é o destino de envio das informações provenientes da sua fonte de dados.

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

-   [The Zapier automation quick-start guide](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Flearn%2Fgetting-started-guide%2F&h=AT3yHWp1KkC3t5Ept04lZ7TS6T71q4MrCxwYAIlKn3LxKfMoWQ_YTCqzWMh64qxG1DftsCXcw-9l_w4I7FBW1GD0JwtEzz_euaN09JzLq64rjlIQKJVUYKR2yedPWxKXGE3PDYkeXMNhVmOKhtQL2UgQFF8HiS9zNkRJZH7wP5U)
    
-   [App tips](https://l.facebook.com/l.php?u=https%3A%2F%2Fzapier.com%2Fblog%2Fcategories%2Fapp-tips%2F&h=AT0hUhCzNzfT6Seao_7RxXOJiz-aGjgGNnZFaCR8YxNjrVoXFBs1crJqtIia_A_XsN5CWpNfRmV4if3kdfPIYBRds4eFvI9y4EMwa6ulr2Yv7EYubz7clzHsYIEEvWx4v2k51p09Ji5X3blHkmPCbYRPB_8XqI7f8_KBGB1pNSE)
    

[](#)