---
title: "Parâmetros-padrão - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data"
scraped_at: "2026-02-01T15:47:04.975Z"
---

# Parâmetros-padrão

Esta tabela lista todos os parâmetros-padrão que os usuários podem enviar à Meta.

Parâmetros-padrão do site

Parâmetros-padrão do app

Parâmetros-padrão offline

Descrição

`availability`

`fb_availability`

`availability`

O valor deve ser `available_soon`, `for_rent`, `for_sale`, `off_market`, `recently_sold` ou `sale_pending`.

`body_style`

`fb_body_style`

`body_style`

Estilo da carroçaria do veículo: `CONVERTIBLE`, `COUPE`, `HATCHBACK`, `MINIVAN`, `TRUCK`, `SUV`, `SEDAN`, `VAN`, `WAGON`, `CROSSOVER` ou `OTHER`.

`checkin_date`

`fb_checkin_date`

`checkin_date`

A data em que o usuário deseja fazer check-in no fuso horário do hotel. Aceitamos datas nos formatos `YYYYMMDD`, `YYYY-MM-DD`, `YYYY-MM-DDThh:mmTZD` e `YYYY-MM-DDThh:mm:ssTZD`.

`city`

`fb_city`

`city`

Informe a cidade da localização da intenção do usuário.

`condition_of_vehicle`

`fb_condition_of_vehicle`

`condition_of_vehicle`

A condição do veículo.

`content_ids`

`fb_content_ids`

`content_ids`

Os números de identificação do conteúdo associado ao evento, como SKUs de produtos para itens em um evento do tipo `AddToCart`.

`content_type`

`fb_content_type`

`content_type`

Deve ser definido como `product` ou `product_group`:

-   Use `product` se as chaves enviadas por você representarem produtos. As chaves podem ser `content_ids` ou `contents`.
    
-   Use `product_group` se as chaves enviadas por você em `content_ids` representarem grupos de produtos. Os grupos de produtos são usados para diferenciar produtos idênticos que apresentam variações, como cor, material, tamanho ou estampa.
    

`contents`

`fb_contents`

`contents`

Uma lista de objetos JSON que contém os IDs dos produtos associados ao evento e informações sobre os itens. Campos disponíveis: `id`, `quantity`, `item_price`, `delivery_category`.

`country`

`fb_country`

`country`

Informe o país da localização da intenção do usuário.

`currency`

`fb_currency`

`currency`

Obrigatório para eventos de compra. A moeda do `value` especificado, se aplicável. O valor deve ser um código de moeda de três dígitos válido que siga a norma [ISO 4217](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217%3Ffbclid%3DIwAR2qARpy3ufnmcEY-sVHvTzUA1AsFOsLYdNsrZP6UYAMRt6NVM5SAhfzfJg&h=AT2r6eiK2ruTrGAGDZMD9w1F8DyIx8MpDR3CHS3UociWddmLd1CSRW5rw9TuFnhBF_m16LTLwEXTHCDlC4fAcE4xN5BLdzTIAXAWq5n9A4Avmzfnz-y506E7Dy5_kqzXHJEv1sIEucVTFa_AtkWLyT8-8YAwBxOsuHOjqnpU3_U).

`delivery_category`

`fb_delivery_category`

`delivery_category`

Opcional para eventos de compra. Tipo de entrega para um evento de compra. Valores compatíveis:

-   `in_store`: o cliente precisa entrar na loja para obter o produto comprado.
    
-   `curbside`: o cliente dirige até uma loja e espera dentro do veículo para pegar o pedido.
    
-   `home_delivery`: a compra é entregue na casa do cliente.
    

`departing_arrival_date`

`fb_departing_arrival_date`

`departing_arrival_date`

A data e hora de chegada ao destino da viagem de ida.

`departing_departure_date`

`fb_departing_departure_date`

`departing_departure_date`

A data e hora de início da viagem de ida.

`destination_airport`

`fb_destination_airport`

`destination_airport`

Use o código IATA oficial do aeroporto de destino.

`destination_ids`

`fb_destination_ids`

`destination_ids`

Se você tiver um catálogo de destinos, poderá associar um ou mais destinos desse catálogo a um evento de hotel específico.

`dma_code`

`fb_dma_code`

`dma_code`

O código da Designated Marketing Area (DMA) usado para direcionar ofertas aos usuários.

`drivetrain`

`fb_drivetrain`

`drivetrain`

Tração do veículo: `4X2`, `4X4`, `AWD`, `FWD`, `RWD`, `OTHER` ou `NONE`.

`exterior_color`

`fb_exterior_color`

`exterior_color`

Cor externa.

`fuel_type`

`fb_fuel_type`

`fuel_type`

Tipo de combustível do veículo: `DIESEL`, `ELECTRIC`, `FLEX`, `GASOLINE`, `HYBRID`, `PETROL`, `PLUGIN_HYBRID`, `OTHER` ou `NONE`.

`hotel_score`

`fb_hotel_score`

`hotel_score`

Um indicador que representa o valor relativo desse hotel para o anunciante em comparação a outros hotéis.

`interior_color`

`fb_interior_color`

`interior_color`

A cor interna.

`lead_event_source`

`lead_event_source`

`lead_event_source`

A fonte do evento de lead.

`lease_end_date`

`fb_lease_end_date`

`lease_end_date`

Especificado usando o formato de data da norma ISO 8601: `YYYY-MM-DD`.

`lease_start_date`

`fb_lease_start_date`

`lease_start_date`

Permite a recomendação de propriedades com base na disponibilidade de datas (usando `available_dates_price_config` no catálogo) e a melhoria da experiência do usuário (usando tags de modelo).

`listing_type`

`fb_listing_type`

`listing_type`

O valor deve ser `for_rent_by_agent`, `for_rent_by_owner`, `for_sale_by_agent`, `for_sale_by_owner`, `foreclosed`, `new_construction` ou `new_listing`.

`make`

`fb_make`

`make`

A marca ou montadora do veículo.

`mileage.unit`

`fb_mileage.unit`

`mileage.unit`

A unidade da quilometragem.

`mileage.value`

`fb_mileage.value`

`mileage.value`

O valor da quilometragem.

`model`

`fb_model`

`model`

O modelo do veículo.

`neighborhood`

`fb_neighborhood`

`neighborhood`

O bairro de interesse.

`net_revenue`

`net_revenue`

`net_revenue`

O valor da margem de um evento de conversão.

`num_adults`

`fb_num_adults`

`num_adults`

O número de adultos que ficarão hospedados.

`num_children`

`fb_num_children`

`num_children`

O número de crianças que ficarão hospedadas.

`num_infants`

`fb_num_infants`

`num_infants`

O número de bebês que ficarão hospedados.

`num_items`

`fb_num_items`

`num_items`

Use apenas com eventos `InitiateCheckout`. O número de itens que um usuário tenta comprar durante a finalização da compra.

`order_id`

`fb_order_id`

`order_id`

A identificação do pedido da transação como uma string.

`origin_airport`

`fb_origin_airport`

`origin_airport`

Use o código IATA oficial do aeroporto de partida.

`postal_code`

`fb_postal_code`

`postal_code`

Código postal.

`predicted_ltv`

`predicted_ltv`

`predicted_ltv`

O valor total previsto de um evento de conversão.

`preferred_baths_range`

`fb_preferred_baths_range`

`preferred_baths_range`

Número de banheiros selecionados em um intervalo.

`preferred_beds_range`

`fb_preferred_beds_range`

`preferred_beds_range`

Número de quartos selecionados em um intervalo.

`preferred_neighborhoods`

`fb_preferred_neighborhoods`

`preferred_neighborhoods`

Os bairros de preferência.

`preferred_num_stops`

`fb_preferred_num_stops`

`preferred_num_stops`

Indique o número de paradas que o usuário está procurando.

`preferred_price_range`

`fb_preferred_price_range`

`preferred_price_range`

A faixa de preço preferencial para o veículo. Mín./máx.: até 2 casas decimais.

`preferred_star_ratings`

`fb_preferred_star_ratings`

`preferred_star_ratings`

Uma tupla de classificação de hotel por estrelas mínima e máxima que um usuário aplica na filtragem.

`price`

`fb_price`

`price`

Custo e moeda do veículo. Formate o preço como o custo, seguido pelo [código de moeda ISO](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217%3Ffbclid%3DIwAR2ULtemU7YsoTB8AJImQX-3SI6WZpHxKb3WXANzqKV00yn6PBbYGdGQmWs&h=AT3Josl8Zmu3vVmSvfLPvn_0uoiAULs_Ntw8U9O4CzBwH1AdUQFJ4G7LueqHq0Dr5gWY_D0feMQwD4zLHqBJ50G0ygwHHK4y2tVobBLNY82lSWYXTknagejNCD1FulY3Wt33_kTWz68sWg4xEDIsphHVqOzW1fqUsffl6Gol-94), com um espaço entre o valor e a moeda.

`product_catalog_id`

`product_catalog_id`

`product_catalog_id`

Identificação do catálogo de produtos.

`property_type`

`fb_property_type`

`property_type`

Deve ser `apartment`, `condo`, `house`, `land`, `manufactured`, `other` ou `townhouse`.

`region`

`fb_region`

`region`

Estado, distrito ou região de interesse.

`returning_arrival_date`

`fb_returning_arrival_date`

`returning_arrival_date`

A data e hora em que a viagem de retorno é concluída.

`returning_departure_date`

`fb_returning_departure_date`

`returning_departure_date`

A data e hora de início da viagem de retorno.

`search_string`

`fb_search_string`

`search_string`

Use apenas com eventos `Search`. Uma pesquisa feita por um usuário.

`state_of_vehicle`

`fb_state_of_vehicle`

`state_of_vehicle`

Estado do veículo.

`suggested_destinations`

`fb_suggested_destinations`

`suggested_destinations`

Os destinos sugeridos.

`suggested_home_listings`

`fb_suggested_home_listings`

`suggested_home_listings`

Os classificados de imóveis sugeridos.

`suggested_hotels`

`fb_suggested_hotels`

`suggested_hotels`

Os hotéis sugeridos.

`suggested_jobs`

`fb_suggested_jobs`

`suggested_jobs`

Os empregos sugeridos.

`suggested_local_service_businesses`

`fb_suggested_local_service_businesses`

`suggested_local_service_businesses`

Os serviços comerciais locais sugeridos.

`suggested_location_based_items`

`fb_suggested_location_based_items`

`suggested_location_based_items`

Os itens baseados em localização sugeridos.

`suggested_vehicles`

`fb_suggested_vehicles`

`suggested_vehicles`

Os veículos sugeridos.

`transmission`

`fb_transmission`

`transmission`

A transmissão do veículo: `AUTOMATIC`, `MANUAL`, `OTHER` ou `NONE`.

`travel_class`

`fb_travel_class`

`travel_class`

Deve ser `economy`, `premium`, `business` ou `first`.

`travel_end`

`fb_travel_end`

`travel_end`

A data de término da viagem.

`travel_start`

`fb_travel_start`

`travel_start`

A data de início da viagem.

`trim`

`fb_trim`

`trim`

Máximo de caracteres: 50.

`user_bucket`

`fb_user_bucket`

`user_bucket`

O grupo do usuário.

`value`

`_valueToSum`

`value`

Obrigatório para eventos de compra ou quaisquer eventos que utilizem otimização de valor.

Um valor numérico associado ao evento. Precisa representar um valor monetário.

`vin`

`fb_vin`

`vin`

Número de chassi.

`year`

`fb_year`

`year`

O ano de lançamento do veículo no formato `yyyy`.

`item_number`

Identificador exclusivo para distinguir eventos dentro do mesmo pedido ou transação.

`ad_type`

O tipo de anúncio.

`fb_content`

Uma lista de objetos JSON que contém o International Article Number (EAN), quando aplicável, ou outro identificador de produto ou conteúdo, assim como as quantidades e os preços dos produtos. Obrigatório: `id`, `quantity`.

  

Exemplo: "\[{\\"id\\": \\"1234\\", \\"quantity\\": 2,}, {\\"id\\": \\"5678\\", \\"quantity\\": 1,}\]".

`fb_content_id`

International Article Number (EAN), quando aplicável, ou outros identificadores de conteúdo ou produto. Para vários números de identificação do produto: por exemplo, "\[\\"1234\\",\\"5678\\"\]".

`fb_description`

Uma descrição de string.

`fb_level`

O nível de um jogo.

`fb_max_rating_value`

O limite máximo de uma escala de classificação, por exemplo, 5 em uma escala de 5 estrelas.

`fb_payment_info_available`

`1` para sim, `0` para não.

`fb_registration_method`

Facebook, Email, Twitter, entre outros.

`fb_success`

`1` para sim, `0` para não.

`_valueToSum`

O valor numérico do evento individual a ser somado nos relatórios.