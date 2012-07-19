-- Returns the current service version.
return select * from ebay.finding.getVersion
via route '/ebay/finding/version' using method get;