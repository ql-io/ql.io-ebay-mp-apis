-- Appends a horizontal rule, then a message about what time the addition was made by the seller, and then the seller-specified text.
-- Example : insert into ebay.trading.AddToItemDescription (ItemID, Description, AddToItemDescriptionRequest.RequesterCredentials.Username, AddToItemDescriptionRequest.RequesterCredentials.Password) values ("{result.ItemID}","Adding item desc", "apitest1","ebay");
create table ebay.trading.AddToItemDescription
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddToItemDescription',
    'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
    'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
    'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddToItemDescription.ejs' type 'application/xml'
    resultset 'AddToItemDescriptionResponse'