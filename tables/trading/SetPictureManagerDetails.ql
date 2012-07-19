--Creates, updates, or deletes Picture Manager account settings, folders, or pictures. This call will soon be deprecated.
create table ebay.trading.SetPictureManagerDetails
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'SetPictureManagerDetails'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetPictureManagerDetails.ejs' type 'application/xml'
    resultset 'SetPictureManagerDetailsResponse'