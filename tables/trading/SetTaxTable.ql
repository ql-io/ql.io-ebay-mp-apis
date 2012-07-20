--Sets the tax table for a seller on a given site.
-- Example : update ebay.trading.SetTaxTable with "{YOUR JSON HERE}"
create table ebay.trading.SetTaxTable
    on update post to '{config.tables.ebay.trading.qa.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'SetTaxTable'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.qa.eBayAuthToken}'
    using bodyTemplate 'SetTaxTable.ejs' type 'application/xml'
    resultset 'SetTaxTableResponse'