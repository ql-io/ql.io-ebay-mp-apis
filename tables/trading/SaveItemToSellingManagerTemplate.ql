-- Creates a Selling Manager listing template that is similar to an item.
-- Example : insert into ebay.trading.SaveItemToSellingManagerTemplate (Version, ProductID, ItemID, TemplateName) values ("737","{result2.SellingManagerProductDetails.ProductID}","{result.ItemID}","{result2.SellingManagerProductDetails.ProductName}");
create table ebay.trading.SaveItemToSellingManagerTemplate
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'SaveItemToSellingManagerTemplate'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SaveItemToSellingManagerTemplate.ejs' type 'application/xml'
    resultset 'SaveItemToSellingManagerTemplateResponse'