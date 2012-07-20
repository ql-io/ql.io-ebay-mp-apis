exports['patch uri'] = function(options) {
    var statement = options.statement, uri = options.uri, params = options.params, count = 0;
    uri.removeEmptyParams();

    return uri;
}