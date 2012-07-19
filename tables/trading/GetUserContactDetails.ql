-- Returns contact information for a specified user, given that a bidding relationship (as either a buyer or seller) exists between the caller and the user.
-- Example: select * from ebay.trading.GetUserContactDetails

create table ebay.trading.GetUserContactDetails
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetUserContactDetails'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetUserContactDetails.xml.mu' type 'application/xml'
      resultset 'GetUserContactDetailsResponse'