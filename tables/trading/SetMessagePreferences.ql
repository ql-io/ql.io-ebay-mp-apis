--Enables a seller to add custom Ask Seller a Question (ASQ) subjects to their Ask a Question page, or to reset any custom subjects to their default values.
-- Example : insert into ebay.trading.SetMessagePreferences values (YOUR XML HERE)
create table ebay.trading.SetMessagePreferences
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'SetMessagePreferences',
    'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
    'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
    'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetMessagePreferences.ejs' type 'application/xml'
    resultset 'SetMessagePreferencesResponse'