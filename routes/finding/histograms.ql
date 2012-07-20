-- Gets category and/or aspect metadata for the specified category.
return select categoryHistogramContainer as categoryHistogramContainer, conditionHistogramContainer as conditionHistogramContainer
from ebay.finding.getHistograms where categoryId = '{categoryId}'
via route '/ebay/finding/histograms/{categoryId}' using method get;