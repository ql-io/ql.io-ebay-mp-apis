--Manages notification and alert preferences for applications and users.
--Example : insert into ebay.trading.SetNotificationPreferences values (YOUR XML HERE)
create table ebay.trading.SetNotificationPreferences
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'SetNotificationPreferences'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetNotificationPreferences.ejs' type 'application/xml'
    resultset 'SetNotificationPreferencesResponse'