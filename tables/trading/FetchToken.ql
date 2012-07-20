-- Retrieves an authentication token for a user. Also for Half.com.
create table ebay.trading.FetchToken
    on select post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'FetchToken'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'FetchToken.ejs' type 'application/xml'
    resultset 'FetchTokenResponse'