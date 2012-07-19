--Enables a seller to "reverse" an Unpaid Item dispute that has been closed, for example, if buyer and seller reach an agreement. The seller's Final Value Fee credit and the buyer's strike are both reversed. if applicable.
--update ebay.trading.SellerReverseDispute with "{YOUR JSON HERE}"';
create table ebay.trading.SellerReverseDispute
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'SellerReverseDispute'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SellerReverseDispute.ejs' type 'application/xml'
    resultset 'SellerReverseDisputeResponse'