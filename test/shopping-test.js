/*
 * Copyright 2011 eBay Software Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This test only works on my own machine. Please contact the author for your customized setting.
 */

"use strict";

var _ = require('../node_modules/ql.io-compiler/node_modules/underscore/underscore'),
    Engine = require('../node_modules/ql.io-ebay-app/node_modules/ql.io-ebay-auth/node_modules/ql.io-engine/lib/engine'),
    util = require('util'),
    http = require('http'),
    Console = require('../../ql.io-public/modules/console/app.js'),
//MutableURI = require('ql.io-mutable-uri'),
    EventEmitter = require('events').EventEmitter;
//logger = require('winston');

//logger.remove(logger.transports.Console);
//logger.add(logger.transports.Console, {level: 'error'});

var engine = new Engine({
    tables : __dirname + '/../tables',
    config: __dirname + '/../config/dev.json'
});

function simpleTest(test,list){
    test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
    test.ok(_.isArray(list.body), 'expected an array');
    test.ok(list.body.length > 0, 'expected some items');
    test.ok(!_.isArray(list.body[0]), 'expected object in the array');
    test.done();
}

module.exports = {
    'route finduserprofile':function (test) {
        var c = new Console({
            tables:__dirname + '/../tables',
            routes:__dirname + '/../routes/',
            config:__dirname + '/../config/dev.json',
            'enable console':false,
            connection:'close'
        });
        c.app.listen(3001, function () {
            var options = {
                host:'localhost',
                port:3001,
                path:'/ebay/shopping/profile/haha',
                method:'GET'
            };
            var req = http.request(options);
            req.addListener('response', function (resp) {
                var data = '';
                resp.addListener('data', function (chunk) {
                    data += chunk;
                });
                resp.addListener('end', function () {
                    var route = JSON.parse(data);
                    test.ok(route[0][0].RegistrationDate, 'Invalid route');
                    c.app.close();
                    test.done();
                });
            });
            req.end();

        });
    },
    'route findhalfproducts':function (test) {
        var c = new Console({
            tables:__dirname + '/../tables',
            routes:__dirname + '/../routes/',
            config:__dirname + '/../config/dev.json',
            'enable console':false,
            connection:'close'
        });
        c.app.listen(3001, function () {
            var options = {
                host:'localhost',
                port:3001,
                path:'/ebay/shopping/half?querykeywords=potter',
                method:'GET'
            };
            var req = http.request(options);
            req.addListener('response', function (resp) {
                var data = '';
                resp.addListener('data', function (chunk) {
                    data += chunk;
                });
                resp.addListener('end', function () {
                    var route = JSON.parse(data);
                    test.ok(_.isArray(route), 'route is not an array')
                    test.ok(route.length > 0, 'route is empty')
                    c.app.close();
                    test.done();
                });
            });
            req.end();

        });
    },
    'FindHalfProducts': function(test) {
        var q;
        q = "select * from ebay.shopping.FindHalfProducts where QueryKeywords = 'wii'";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.Products.Product), 'expected an array');
                test.ok(list.body.Products.Product.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.Products.Product[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'FindHalfProducts0': function(test) {
        var q;
        q = "select * from ebay.shopping.FindHalfProducts where pidValue = 100252656 and pidtype = 'Reference'";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.Products.Product), 'expected an array');
                test.ok(list.body.Products.Product.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.Products.Product[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'FindPopularItems': function(test) {
        var q;
        q = "select * from ebay.shopping.FindPopularItems where QueryKeywords = 'phone'";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.ItemArray.Item), 'expected an array');
                test.ok(list.body.ItemArray.Item.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.ItemArray.Item[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'FindPopularSearches': function(test) {
        var q;
        q = "select * from ebay.shopping.FindPopularSearches where QueryKeywords = 'dell' and CategoryID in (58058, 177)";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.PopularSearchResult), 'expected an array');
                test.ok(list.body.PopularSearchResult.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.PopularSearchResult[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'FindProducts0': function(test) {
        var q;
        q = "select * from  ebay.shopping.FindProducts where QueryKeywords='ipad'";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.Product), 'expected an array');
                test.ok(list.body.Product.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.Product[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'FindProducts1': function(test) {
        var q;
        q = "select * from  ebay.shopping.FindProducts where pidValue= 61437604 and pidtype='Reference'";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.Product), 'expected an array');
                test.ok(list.body.Product.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.Product[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'FindProducts2': function(test) {
        var q;
        q = "select * from  ebay.shopping.FindProducts where CategoryID = 279";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.Product), 'expected an array');
                test.ok(list.body.Product.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.Product[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'FindReviewsAndGuides': function(test) {
        var q;
        q = "select * from ebay.shopping.FindReviewsAndGuides";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.BuyingGuideDetails.BuyingGuide), 'expected an array');
                test.ok(list.body.BuyingGuideDetails.BuyingGuide.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.BuyingGuideDetails.BuyingGuide[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'GetCategoryInfo': function(test) {
        var q;
        q = "select * from ebay.shopping.GetCategoryInfo where CategoryID = 279";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.CategoryArray.Category), 'expected an array');
                test.ok(list.body.CategoryArray.Category.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.CategoryArray.Category[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'GeteBayTime': function(test) {
        var q;
        q = "select * from ebay.shopping.GeteBayTime";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isString(list.body.Timestamp), 'expected a string');
                test.ok(list.body.Timestamp.length > 0, 'expected some context in body');
                test.done();
            }
        });
    },
    'GetItemStatus': function(test) {
        var q;
        q = "select * from ebay.shopping.GetItemStatus where ItemID in (select searchResult.item[0].itemId from ebay.finding.findItemsByKeywords where keywords = 'phone' and paginationInput.entriesPerPage = 2)";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.Item), 'expected an array');
                test.ok(list.body.Item.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.Item[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'GetMultipleItems': function(test) {
        var q;
        q = "select * from ebay.shopping.GetMultipleItems where ItemID in (select searchResult.item[0].itemId from ebay.finding.findItemsByKeywords where keywords = 'phone' and paginationInput.entriesPerPage = 2)";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body.Item), 'expected an array');
                test.ok(list.body.Item.length > 0, 'expected some items');
                test.ok(!_.isArray(list.body.Item[0]), 'expected object in the array');
                test.done();
            }
        });
    },
    'GetShippingCosts': function(test) {
        var q;
        q = 'itemid = select searchResult.item.itemId from ebay.finding.findItemsByKeywords where keywords = "phone" and paginationInput.entriesPerPage = 1;return select * from ebay.shopping.GetShippingCosts where ItemID = "{itemid}" and DestinationPostalCode = 95125';
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isString(list.body.ShippingCostSummary.ShippingType), 'expected some shipping detail');
                test.done();
            }
        });
    },
    'GetSingleItem': function(test) {
        var q;
        q = 'itemid=select searchResult.item.itemId from ebay.finding.findItemsByKeywords where keywords = "phone" and paginationInput.entriesPerPage = 1;return select * from ebay.shopping.GetSingleItem where ItemID = "{itemid}"';
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isString(list.body.Item.ItemID), 'expected some valid itemID');
                test.done();
            }
        });
    },
    'GetUserProfile': function(test) {
        var q;
        q = "select * from ebay.shopping.GetUserProfile where UserID = 'ryantindall'";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isString(list.body.User.UserID), 'expected some valid userid');
                test.done();
            }
        });
    }
//end
}


