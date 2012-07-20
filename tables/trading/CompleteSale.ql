--Enables a seller to do various tasks after the creation of a single line item or multiple line item order.
--Example :update ebay.trading.CompleteSale with "{YOUR JSON HERE}";
create table ebay.trading.CompleteSale
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'CompleteSale'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'CompleteSale.ejs' type 'application/xml'
    resultset 'CompleteSaleResponse'