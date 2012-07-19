-- Retrieves a botblock token and URLs for an image or audio clip that the user is to match.
-- Example: select ChallengeToken from ebay.trading.GetChallengeToken where WarningLevel = 'High'

create table ebay.trading.GetChallengeToken
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetChallengeToken'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetChallengeToken.ejs' type 'application/xml'
      resultset 'GetChallengeTokenResponse'