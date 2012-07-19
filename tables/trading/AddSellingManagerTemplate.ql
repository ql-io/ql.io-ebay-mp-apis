-- Adds a Selling Manager template.
-- Example : insert into ebay.trading.AddSellingManagerTemplate values (YOUR XML HERE)
create table ebay.trading.AddSellingManagerTemplate
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddSellingManagerTemplate'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddSellingManagerTemplate.ejs' type 'application/xml'
    resultset 'AddSellingManagerTemplateResponse'