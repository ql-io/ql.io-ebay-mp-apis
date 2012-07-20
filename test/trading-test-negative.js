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
    'GetApiAccessRules':function (test) {
        var q;
        q = "select * from ebay.trading.GetApiAccessRules where eBayAuthToken = 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetAttributesCS':function (test) {
        var q;
        q = "select * from ebay.trading.GetAttributesCS where AttributeSetID = 2210 and DetailLevel = 'ReturnAll' and eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetAttributesXSL':function (test) {
        var q;
        q = "select * from ebay.trading.GetAttributesXSL where eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetCategories':function (test) {
        var q;
        q = "select * from ebay.trading.GetCategories where LevelLimit = 1 and DetailLevel = 'ReturnAll' and eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetCategories2CS':function (test) {
        var q;
        q = "select * from ebay.trading.GetCategory2CS where CategoryID = 237 and DetailLevel = 'ReturnAll' and eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetFeatures':function (test) {
        var q;
        q = "select * from ebay.trading.GetCategoryFeatures where RequesterCredentials.eBayAuthToken='abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetCategoriesMappings':function (test) {
        var q;
        q = "select * from ebay.trading.GetCategoryMappings where RequesterCredentials.eBayAuthToken = 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetCategoriesSpecifics':function (test) {
        var q;
        q = "select * from ebay.trading.GetCategorySpecifics  where CategorySpecific.CategoryID = 20668 and RequesterCredentials.eBayAuthToken = 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetClientAlertAuthToken':function (test) {
        var q;
        q = "select * from ebay.trading.GetClientAlertsAuthToken  where RequesterCredentials.eBayAuthToken = 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetDescriptionTemplates':function (test) {
        var q;
        q = "select * from ebay.trading.GetDescriptionTemplates where RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GeteBayDetails':function (test) {
        var q;
        q = "select * from ebay.trading.GeteBayDetails where DetailName = 'SiteDetails' and RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GeteBayDetails2':function (test) {
        var q;
        q = "select * from ebay.trading.GeteBayDetails where DetailName = 'ShippingCarrierDetails' and RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GeteBayDetails3':function (test) {
        var q;
        q = "select * from ebay.trading.GeteBayDetails where DetailName = 'ReturnPolicyDetails' and RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GeteBayDetails4':function (test) {
        var q;
        q = "select * from ebay.trading.GeteBayDetails where DetailName = 'URLDetails' and RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GeteBayOfficialTime':function (test) {
        var q;
        q = "select * from ebay.trading.GeteBayOfficialTime where RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetFeedback':function (test) {
        var q;
        q = "select * from ebay.trading.GetFeedback where UserID = 'gaingame-outlet' and RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetItemRecommendations':function (test) {
        var q;
        q = "select * from ebay.trading.GetItemRecommendations where GetRecommendationsRequestContainer.Item.PrimaryCategory.CategoryID = 20668 and RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetItemsAwaitingFeedback':function (test) {
        var q;
        q = "select * from ebay.trading.GetItemsAwaitingFeedback where RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetItemShipping':function (test) {
        var q;
        q = "select * from ebay.trading.GetItemShipping where ItemID = 330695476860 and QuantitySold = 1 and DestinationPostalCode = 95125 and RequesterCredentials.eBayAuthToken= 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetItemTransactions':function (test) {
        var q;
        q = "select * from ebay.trading.GetItemTransactions where ItemID=330695476860 and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetMyeBayBuying':function (test) {
        var q;
        q = "select * from ebay.trading.GetMyeBayBuying where BuyingSummary.Include = true and DetailLevel = 'ReturnAll' and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetMyeBayReminders':function (test) {
        var q;
        q = "select * from ebay.trading.GetMyeBayReminders where BuyingReminders.DurationInDays =45 and SellingReminders.DurationInDays = 45 and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetMyeBaySelling':function (test) {
        var q;
        q = "select * from ebay.trading.GetMyeBaySelling where ActiveList.Sort ='TimeLeft' and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetMyMessages':function (test) {
        var q;
        q = "select * from ebay.trading.GetMyMessages where DetailLevel = 'ReturnHeaders' and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetOrders':function (test) {
        var q;
        q = "select * from ebay.trading.GetOrders where CreateTimeFrom = '2007-12-01T20:34:44.000Z' and CreateTimeTo = '2007-12-10T20:34:44.000Z' and OrderRoll = 'Seller' and OrderStatus = 'Active' and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetOrderTransactions':function (test) {
        var q;
        q = "select * from ebay.trading.GetOrderTransactions where OrderIDArray.OrderID = 865826 and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetPopularKeywords':function (test) {
        var q;
        q = "select * from ebay.trading.GetPopularKeywords where CategoryID = 377 and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellerEvents':function (test) {
        var q;
        q = "select * from ebay.trading.GetSellerEvents where StartTimeFrom='2009-10-01T00:00:01.000Z' and DetailLevel = 'ReturnAll' and eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellerList':function (test) {
        var q;
        q = "select * from ebay.trading.GetSellerList where StartTimeFrom = '2010-02-12T21:59:59.005Z' and StartTimeTo = '2010-02-26T21:59:59.005Z' and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellerPayments':function (test) {
        var q;
        q = "select * from ebay.trading.GetSellerPayments where PaymentTimeFrom = '2010-02-12T21:59:59.005Z' and PaymentTimeTo = '2010-02-26T21:59:59.005Z' and PaymentStatus = 'Paid' and RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellerTransactions':function (test) {
        var q;
        q = "select * from ebay.trading.GetSellerTransactions where RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetShippingDiscountProfiles':function (test) {
        var q;
        q = "select * from ebay.trading.GetShippingDiscountProfiles where eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSuggestedCategories':function (test) {
        var q;
        q = "select * from ebay.trading.GetSuggestedCategories where Query = 'camera' and eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetUserDisputes':function (test) {
        var q;
        q = "select * from ebay.trading.GetUserDisputes where RequesterCredentials.eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetUserPreferences':function (test) {
        var q;
        q = "select * from ebay.trading.GetUserPreferences where ShowSellerPaymentPreferences = true and ShowSellerExcludeShipToLocationPreference = true and eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetWantItNowPost':function (test) {
        var q;
        q = "select * from ebay.trading.GetWantItNowPost where PostID = 120883968450 and eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetAdFormatLeads':function (test) {
        var q;
        q = "select * from ebay.trading.GetAdFormatLeads where ItemID = 290006607384";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetAccount':function (test) {
        var q;
        q = "select * from ebay.trading.GetAllBidders where AccountEntrySortType = 'Ascending' and AccountHistorySelection = 'LastInvoice' and ItemID = 29000660";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetAllBidders':function (test) {
        var q;
        q = "select * from ebay.trading.GetAllBidders where ItemID = 29000660738";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetChallengeToken':function (test) {
        var q;
        q = "select * from ebay.trading.GetChallengeToken where WarningLevel='a'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetCharities':function (test) {
        var q;
        q = "select * from ebay.trading.GetCharities where Query = 'memory' and eBayAuthToken = '{config.tables.ebay.trading.sandbox.eBayAuthToken}'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetItem':function (test) {
        var q;
        q = "select * from ebay.trading.GetItem where ItemID = 28000269518";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetMemberMessages(1)': function (test) {
        var q;
        q = "select * from ebay.trading.GetMemberMessages where MailMessageType = 'AskSellerQuestion' and ItemID = 29000588695";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetMemberMessages(2)': function (test) {
        var q;
        q = "select * from ebay.trading.GetMemberMessages where MailMessageType = 'A' and ItemID = 290005886956";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },

    'GetMessagePreferences': function (test) {
        var q;
        q = "select * from ebay.trading.GetMessagePreferences where SellerID = 'a'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellerDashboard': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellerDashboard where eBayAuthToken = '{config.tables.ebay.trading.sandbox.eBayAuthToken}'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellingManagerAlerts': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerAlerts where eBayAuthToken = 'abcd'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellingManagerEmailLog': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerEmailLog where TransactionID=0 and ItemID=29000660738";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellingManagerInventory ': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerInventory where eBayAuthToken = '{config.tables.ebay.trading.sandbox.eBayAuthToken}'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellingManagerInventoryFolder': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerInventoryFolder where eBayAuthToken = '{config.tables.ebay.trading.sandbox.eBayAuthToken}'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellingManagerSoldListings': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerSoldListings where eBayAuthToken = '{config.tables.ebay.trading.sandbox.eBayAuthToken}'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellingManagerTemplateAutomationRule': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerTemplateAutomationRule where SaleTemplateID=11204";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellingManagerTemplates': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerTemplates where SaleTemplateID=11204";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetSellingManagerItemAutomationRule': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerTemplateAutomationRule where SaleTemplateID=11204";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetTaxTable': function (test) {
        var q;
        q = "select * from ebay.trading.GetTaxTable where eBayAuthToken = '{config.tables.ebay.trading.sandbox.eBayAuthToken}'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    },
    'GetTokenStatus': function (test) {
        var q;
        q = "select * from ebay.trading.GetTokenStatus where eBayAuthToken = 'abc'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.ok(false, 'Good.');
                test.done();
            }
            else {
                test.ok(true, 'Expected to fail');
                test.done();
            }
        });
    }

}