-- Retrieves data pertaining to a single eBay user.
-- Examplke : select * from ebay.trading.GetUser where userid="test"

-- Uses eBay api in sandbox and fetches user details for a given userid

create table ebay.trading.GetUser
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetUser'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetUser.ejs' type 'application/xml'
      resultset 'GetUserResponse.User'