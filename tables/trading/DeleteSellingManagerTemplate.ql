--Deletes a Selling Manager template.

create table ebay.trading.DeleteSellingManagerTemplate
    on delete post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                  'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                  'X-EBAY-API-CALL-NAME'= 'DeleteSellingManagerTemplate'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'DeleteSellingManagerTemplate.ejs' type 'application/xml'
    resultset 'DeleteSellingManagerTemplateResponse'