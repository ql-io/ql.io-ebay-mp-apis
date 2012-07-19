-- Enables a user to remove one or more items from their My eBay watch list.
-- Example : delete from ebay.trading.RemoveFromWatchList where ItemID in ("{itemId}");
create table ebay.trading.RemoveFromWatchList
    on delete post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                  'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                  'X-EBAY-API-CALL-NAME'= 'RemoveFromWatchList'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'RemoveFromWatchList.ejs' type 'application/xml'
    resultset 'RemoveFromWatchListResponse'