--select * from ebay.finding.getSearchKeywordsRecommendation where keywords = 'harry poter'


create table ebay.finding.getSearchKeywordsRecommendation
   on select get from '{config.tables.ebay.finding.getSearchKeywordsRecommendation.url}'
                 with aliases format = 'RESPONSE-DATA-FORMAT'
                 using defaults format = 'JSON', apikey =  "{config.tables.ebay.finding.appname}"
                 resultset 'getSearchKeywordsRecommendationResponse'