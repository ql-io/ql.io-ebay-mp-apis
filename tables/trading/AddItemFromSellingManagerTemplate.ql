-- Creates listings from Selling Manager templates
-- Example : insert into ebay.trading.AddItemFromSellingManagerTemplate (Version, SaleTemplateID) values ("737", "206923");

create table ebay.trading.AddItemFromSellingManagerTemplate
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddItemFromSellingManagerTemplate'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddItemFromSellingManagerTemplate.ejs' type 'application/xml'
    resultset 'AddItemFromSellingManagerTemplateResponse'