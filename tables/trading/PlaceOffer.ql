-- Enables the authenticated user to to make a bid, a best offer, or a purchase on the item specified by the ItemID input field.
-- Example : insert into ebay.trading.PlaceOffer (ErrorLanguage,EndUserIP,ItemID,Offer.Action, Offer.MaxBid, Offer.Quantity ) values ("en_US", "192.168.255.255", "{result.ItemID}", "Bid", "20.00","1");
create table ebay.trading.PlaceOffer
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'PlaceOffer'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'PlaceOffer.ejs' type 'application/xml'
    resultset 'PlaceOfferResponse'