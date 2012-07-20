--Sets the authenticated user's preferences to those specified in the request.
-- Example :   update ebay.trading.SetUserPreferences with "{YOUR JSON HERE}"

create table ebay.trading.SetUserPreferences
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'SetUserPreferences'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetUserPreferences.ejs' type 'application/xml'
    resultset 'SetUserPreferencesResponse'