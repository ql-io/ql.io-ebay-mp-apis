--Enables a seller to define shipping cost discount profiles for things such as combined payments for shipping and handling costs.
create table ebay.trading.SetShippingDiscountProfiles
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'SetShippingDiscountProfiles'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetShippingDiscountProfiles.ejs' type 'application/xml'
    resultset 'SetShippingDiscountProfilesResponse'