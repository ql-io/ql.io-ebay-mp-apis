--select * from ebay.finding.getHistograms where categoryId = 11233


create table ebay.finding.getHistograms
   on select get from '{config.tables.ebay.finding.getHistograms.url}'
                 with aliases format = 'RESPONSE-DATA-FORMAT'
                 using defaults format = 'JSON', apikey =  "{config.tables.ebay.finding.appname}"
                 resultset 'getHistogramsResponse'