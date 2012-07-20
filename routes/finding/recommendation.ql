-- Checks specified keywords and returns correctly spelled keywords for best search results.
return select keywords, errorMessage
from ebay.finding.getSearchKeywordsRecommendation where keywords = '{keywords}'
via route '/ebay/finding/recommendation/{keywords}' using method get;