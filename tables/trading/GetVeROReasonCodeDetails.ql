-- Retrieves details about VeRO reason codes for a given site or all sites. You must be a member of the Verified Rights Owner (VeRO) Program to use this call.
-- Example: select * from ebay.trading.GetVeROReasonCodeDetails
-- need to be registered
create table ebay.trading.GetVeROReasonCodeDetails
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetVeROReasonCodeDetails'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetVeROReasonCodeDetails.xml.mu' type 'application/xml'
      resultset 'GetVeROReasonCodeDetailsResponse'