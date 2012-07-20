-- select * from ebay.finding.getVersion

create table ebay.finding.getVersion
   on select get from '{config.tables.ebay.finding.getVersion.url}'
                 with aliases format = 'RESPONSE-DATA-FORMAT'
                 using defaults format = 'JSON'
                 resultset 'getVersionResponse.version'