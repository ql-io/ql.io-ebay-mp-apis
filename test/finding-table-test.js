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
    Engine = require('../../ql.io-public/modules/engine/lib/engine'),
    util = require('util'),
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
    test.ok(_.isArray(list.body.searchResult.item), 'expected an array');
    test.ok(list.body.searchResult.item.length > 0, 'expected some items');
    test.ok(!_.isArray(list.body.searchResult.item[0]), 'expected object in the array');
    test.done();
}

module.exports = {
    'findCompletedItems': function(test) {
        var q;
        q = "select * from ebay.finding.findItemsByImage where itemId = 120896726588 and paginationInput.entriesPerPage = 2";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list)
            }
        });
    },
    'findItemsAdvanced': function(test) {
        var q;
        q = "select * from ebay.finding.findItemsAdvanced where keywords='ipad2' and paginationInput.entriesPerPage = 2";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list)
            }
        });
    },
    'findItemsByCategory': function(test) {
        var q;
        q = "select * from ebay.finding.findItemsByCategory where categoryId =139971 and paginationInput.entriesPerPage = 2";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list)
            }
        });
    },
    'findItemsByImage': function(test) {
        var q;
        q = "select * from ebay.finding.findItemsByImage where itemId = 120896726588 and paginationInput.entriesPerPage = 2";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list)
            }
        });
    },
    'findItemsByKeywords': function(test) {
        var q;
        q = "select * from ebay.finding.findItemsByKeywords where keywords ='wii' and paginationInput.entriesPerPage = 2";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list)
            }
        });
    },
    'findItemsByProduct 1': function(test) {
        var q;
        q = "select * from ebay.finding.findItemsByProduct where productId = 53039031 and productId.type = ReferenceID and paginationInput.entriesPerPage = 2";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list)
            }
        });
    },
    'findItemsByProduct 2': function(test) {
        var q;
        q = "select * from ebay.finding.findItemsByProduct where productId = '9780316087384' and productId.type = 'ISBN' and paginationInput.entriesPerPage = 2"
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list)
            }
        });
    },
    'findItemsIneBayStores': function(test) {
        var q;
        q = "select * from ebay.finding.findItemsIneBayStores where keywords = 'wii' and outputSelector = 'StoreInfo' and paginationInput.entriesPerPage = 2";
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list)
            }
        });
    },
    'getHistograms': function(test) {
        var q;
        q = "select * from ebay.finding.getHistograms where categoryId = 11233"
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done()
            }
        });
    },
    'getSearchKeywordsRecommendation': function(test) {
        var q;
        q = "select * from ebay.finding.getSearchKeywordsRecommendation where keywords = 'harry poter'"
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done()
            }
        });
    },
    'getVersion': function(test) {
        var q;
        q = "select * from ebay.finding.getVersion"
        engine.exec(q, function(err, list) {
            if(err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done()
            }
        });
    }


}
