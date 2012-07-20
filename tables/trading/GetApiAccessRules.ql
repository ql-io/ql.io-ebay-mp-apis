-- Reports how many calls your application has made and is allowed to make per hour or day. Also for Half.com.
-- Example: select * from ebay.trading.GetApiAccessRules
create table ebay.trading.GetApiAccessRules
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetApiAccessRules'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetApiAccessRules.ejs' type 'application/xml'
      resultset 'GetApiAccessRulesResponse'
