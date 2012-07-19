exports['patch uri'] = function(options) {
    var statement = options.statement, uri = options.uri, params = options.params, count = 0;
    if(statement.offset && statement.limit) {
        uri.setParam('paginationInput.pageNumber', statement.offset / statement.limit);
    }
    uri.removeEmptyParams();

    count = 0
    if(params.FreeShippingOnly) {
        uri.addParam("itemFilter(" + count + ").name", 'FreeShippingOnly');
        uri.addParam("itemFilter(" + count + ").value", params.FreeShippingOnly);
        count++;
    }
    if(params.MinPrice) {
        uri.addParam("itemFilter(" + count + ").name", 'MinPrice');
        uri.addParam("itemFilter(" + count + ").value", params.MinPrice);
        count++;
    }
    if(params.BestOfferOnly) {
        uri.addParam("itemFilter(" + count + ").name", 'BestOfferOnly');
        uri.addParam("itemFilter(" + count + ").value", params.BestOfferOnly);
        count++;
    }
    if(params.ListingType) {
        uri.addParam("itemFilter(" + count + ").name", 'ListingType');
        uri.addParam("itemFilter(" + count + ").value", params.ListingType);
        count++;
    }
    return uri;
}

exports['patch status'] = function(options) {
    var json = options.body;
    if(json && ((json.findItemsByKeywordsResponse && json.findItemsByKeywordsResponse.ack === 'Failure') ||
        json.errorMessage)) {
        return 400;
    }
    else {
        return 200;
    }
}