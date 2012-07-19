-- Retrieves status information about VeRO reported items. You must be a member of the Verified Rights Owner (VeRO) Program to use this call.
-- Example: select * from ebay.trading.GetVeROReportStatus
--
create table ebay.trading.GetVeROReportStatus
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetVeROReportStatus'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetVeROReportStatus.ejs' type 'application/xml'
      resultset 'GetVeROReportStatusResponse'