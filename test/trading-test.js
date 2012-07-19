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

function simpleTest_obj(test,list){
    test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
    test.ok(_.isArray(list.body), 'expected an array');
    test.ok(list.body.length > 0, 'expected some items');
    test.ok(_.isObject(list.body));
    test.done();
}

module.exports = {
    'GetApiAccessRules':function (test) {
        var q;
        q = "select ApiAccessRule from ebay.trading.GetApiAccessRules";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetAttributesCS':function (test) {
        var q;
        q = "select * from ebay.trading.GetAttributesCS where AttributeSetID = 2210 and DetailLevel = 'ReturnAll'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetAttributesXSL':function (test) {
        var q;
        q = "select XSLFile from ebay.trading.GetAttributesXSL";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetCategories':function (test) {
        var q;
        q = "select CategoryArray.Category from ebay.trading.GetCategories where LevelLimit = 1 and DetailLevel = 'ReturnAll'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetCategories2CS':function (test) {
        var q;
        q = "select SiteWideCharacteristicSets from ebay.trading.GetCategory2CS where CategoryID = 237 and DetailLevel = 'ReturnAll'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetFeatures':function (test) {
        var q;
        q = "select GetCategoryFeaturesResponse.FeatureDefinitions from ebay.trading.GetCategoryFeatures";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetCategoriesMappings':function (test) {
        var q;
        q = "select * from ebay.trading.GetCategoryMappings";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetCategoriesSpecifics':function (test) {
        var q;
        q = "select Recommendations from ebay.trading.GetCategorySpecifics  where CategorySpecific.CategoryID = 20668";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetClientAlertAuthToken':function (test) {
        var q;
        q = "select ClientAlertsAuthToken from ebay.trading.GetClientAlertsAuthToken";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
//Need to insert a valid ItemID...the ItemID below has expired.

//    'GetCrossPromotions':function (test) {
//        var q;
//        q = "select * from ebay.trading.GetCrossPromotions  where PromotionMethod = 'CrossSell' and ItemID = 290006391760";
//        engine.exec(q, function (err, list) {
//            if (err) {
//                test.fail('got error: ' + err.stack || err);
//                test.done();
//            }
//            else {
//                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
//                test.ok(_.isArray(list.body.CrossPromotion.PromotedItem));
//                test.ok(list.body.CrossPromotion.PromotedItem.length > 0, 'expected some items');
//                test.done();
//            }
//        });
//    },
    'GetDescriptionTemplates':function (test) {
        var q;
        q = "select DescriptionTemplate from ebay.trading.GetDescriptionTemplates";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
           }
        });
    },
    'GeteBayDetails':function (test) {
        var q;
        q = 'select SiteDetails from ebay.trading.GeteBayDetails where DetailName = "SiteDetails"';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body[0]));
                test.ok(list.body.length > 0, 'expected some items');
            }
        });
        q = 'select ShippingCarrierDetails from ebay.trading.GeteBayDetails where DetailName = "ShippingCarrierDetails"';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body[0]));
                test.ok(list.body.length > 0, 'expected some items');
            }
        });
        q = 'select ReturnPolicyDetails from ebay.trading.GeteBayDetails where DetailName = "ReturnPolicyDetails"';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
            }
        });
        q = 'select URLDetails from ebay.trading.GeteBayDetails where DetailName = "URLDetails"';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.ok(_.isArray(list.body[0]));
                test.ok(list.body.length > 0, 'expected some items');
                test.done();
            }
        });
    },
    'GeteBayOfficialTimeResponse':function (test) {
        var q;
        q = 'select Timestamp from ebay.trading.GeteBayOfficialTime';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetFeedback':function (test) {
        var q;
        q = "select FeedbackSummary from ebay.trading.GetFeedback where UserID = 'gaingame-outlet'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetItemRecommendations':function (test) {
        var q;
        q = "select * from ebay.trading.GetItemRecommendations where GetRecommendationsRequestContainer.Item.PrimaryCategory.CategoryID = 20668";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetItemsAwaitingFeedback':function (test) {
        var q;
        q = 'select ItemsAwaitingFeedback from ebay.trading.GetItemsAwaitingFeedback';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetItemShipping':function (test) {
        var q;
        q = 'select ShippingDetails from ebay.trading.GetItemShipping where ItemID = 330695476860 and QuantitySold = 1 and DestinationPostalCode = 95125';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetItemTransactions':function (test) {
        var q;
        q = 'select TransactionArray from ebay.trading.GetItemTransactions where ItemID=330695476860';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetMyeBayBuying':function (test) {
        var q;
        q = 'select WatchList, WonList from ebay.trading.GetMyeBayBuying where BuyingSummary.Include = true and DetailLevel = "ReturnAll"';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetMyeBayReminders':function (test) {
        var q;
        q = 'select BuyingReminders from ebay.trading.GetMyeBayReminders where BuyingReminders.DurationInDays =45 and SellingReminders.DurationInDays = 45';
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetMyeBaySelling':function (test) {
        var q;
        q = "select ActiveList from ebay.trading.GetMyeBaySelling where ActiveList.Sort ='TimeLeft'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetMyMessages':function (test) {
        var q;
        q = "select Messages from ebay.trading.GetMyMessages where DetailLevel = 'ReturnHeaders'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetOrders':function (test) {
        var q;
        q = "select * from ebay.trading.GetOrders where CreateTimeFrom = '2007-12-01T20:34:44.000Z' and CreateTimeTo = '2007-12-10T20:34:44.000Z' and OrderRoll = 'Seller' and OrderStatus = 'Active'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetOrderTransactions':function (test) {
        var q;
        q = "select * from ebay.trading.GetOrderTransactions where OrderIDArray.OrderID = 865826";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetPopularKeywords':function (test) {
        var q;
        q = "select CategoryArray from ebay.trading.GetPopularKeywords where CategoryID = 377";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetSellerEvents':function (test) {
        var q;
        q = "select ItemArray from ebay.trading.GetSellerEvents where StartTimeFrom='2012-04-20T00:00:01.000Z' and DetailLevel = 'ReturnSummary' limit 3000";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetSellerList':function (test) {
        var q;
        q = "select ItemArray from ebay.trading.GetSellerList where StartTimeFrom = '2011-02-12T21:59:59.005Z' and StartTimeTo = '2011-02-14T21:59:59.005Z'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
//This test needs an authenticated seller of half.com
//    'GetSellerPayments':function (test) {
//        var q;
//        q = "select * from ebay.trading.GetSellerPayments where PaymentTimeFrom = '2010-02-12T21:59:59.005Z' and PaymentTimeTo = '2010-02-26T21:59:59.005Z' and PaymentStatus = 'Paid'";
//        engine.exec(q, function (err, list) {
//            if (err) {
//                test.fail('got error: ' + err.stack || err);
//                test.done();
//            }
//            else {
//                simpleTest(test,list);
////                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
////                test.done();
//            }
//        });
//    },
    'GetSellerTransactions':function (test) {
        var q;
        q = "select Seller from ebay.trading.GetSellerTransactions";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetShippingDiscountProfiles':function (test) {
        var q;
        q = "select FlatShippingDiscount,CalculatedShippingDiscount,PromotionalShippingDiscount,PromotionalShippingDiscountDetails from ebay.trading.GetShippingDiscountProfiles";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetSuggestedCategories':function (test) {
        var q;
        q = "select SuggestedCategoryArray from ebay.trading.GetSuggestedCategories where Query = 'camera'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetUserDisputes':function (test) {
        var q;
        q = "select DisputeArray,DisputeFilterCount from ebay.trading.GetUserDisputes where Pagination.PageNumber= 5";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetUserPreferences':function (test) {
        var q;
        q = "select SellerPaymentPreferences ,SellerExcludeShipToLocationPreferences from ebay.trading.GetUserPreferences where ShowSellerPaymentPreferences = true and ShowSellerExcludeShipToLocationPreference = true";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetWantItNowPost':function (test) {
        var q;
        q = "select WantItNowPost as WantItNowPost from ebay.trading.GetWantItNowPost where PostID = 120883968450";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
//This call returns errors even when tested using SCP
//    'GetAccount':function (test) {
//        var q;
//        q = "select * from ebay.trading.GetAccount where AccountEntrySortType = 'Ascending' and AccountHistorySelection = 'LastInvoice' and ItemID = 290006607384";
//        engine.exec(q, function (err, list) {
//            if (err) {
//                test.fail('got error: ' + err.stack || err);
//                test.done();
//            }
//            else {
//                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
//                test.done();
//            }
//        });
//    },
    'GetAdFormatLeads':function (test) {
        var q;
        q = "select Ack from ebay.trading.GetAdFormatLeads where ItemID = 290006391760 and DetailLevel = 'ReturnAll'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.body, 'Success', 'Success expected');
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetAllBidders':function (test) {
        var q;
        q = "select BidArray,HighBidder,HighBid from ebay.trading.GetAllBidders where ItemID = 290006607384";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetBestOffers':function (test) {
        var q;
        q = "select * from ebay.trading.GetBestOffers where ItemID = '290006792403' and Version = '737'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetChallengeToken':function (test) {
        var q;
        q = "select ChallengeToken from ebay.trading.GetChallengeToken where WarningLevel = 'High'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetCharities':function (test) {
        var q;
        q = "select Charity from ebay.trading.GetCharities where Query = 'memory'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetItem':function (test) {
        var q;
        q = "select Item from ebay.trading.GetItem where ItemID = 280002695183";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetMemberMessages': function (test) {
        var q;
        q = "select Ack from ebay.trading.GetMemberMessages where MailMessageType = 'AskSellerQuestion' and ItemID = 290005886956";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.body, 'Success', 'Success expected');
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetMemberMessages(2)': function (test) {
        var q;
        q = "select MemberMessage from ebay.trading.GetMemberMessages where MailMessageType = 'All' and ItemID = 290005886956";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetMessagePreferences': function (test) {
        var q;
        q = "select Ack from ebay.trading.GetMessagePreferences where SellerID = 'apitest1'";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.body, 'Success', 'Success expected');
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetSellerDashboard': function (test) {
        var q;
        q = "select SellerFeeDiscount,PowerSellerStatus,PolicyCompliance,SellerAccount,Performance from ebay.trading.GetSellerDashboard";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetSellingManagerAlerts': function (test) {
        var q;
        q = "select Alert from ebay.trading.GetSellingManagerAlerts";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetSellingManagerEmailLog': function (test) {
        var q;
        q = "select EmailLog from ebay.trading.GetSellingManagerEmailLog where TransactionID=0 and ItemID=290006607384";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetSellingManagerInventory ': function (test) {
        var q;
        q = "select SellingManagerProduct from ebay.trading.GetSellingManagerInventory";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetSellingManagerInventoryFolder': function (test) {
        var q;
        q = "select Folder from ebay.trading.GetSellingManagerInventoryFolder";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetSellingManagerSoldListings': function (test) {
        var q;
        q = "select SaleRecord from ebay.trading.GetSellingManagerSoldListings";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest_obj(test,list);
            }
        });
    },
    'GetSellingManagerTemplateAutomationRule': function (test) {
        var q;
        q = "select AutomatedRelistingRule from ebay.trading.GetSellingManagerTemplateAutomationRule where SaleTemplateID=112048";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetSellingManagerTemplates': function (test) {
        var q;
        q = "select * from ebay.trading.GetSellingManagerTemplates where SaleTemplateID=112048";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetSellingManagerItemAutomationRule': function (test) {
        var q;
        q = "select AutomatedRelistingRule from ebay.trading.GetSellingManagerTemplateAutomationRule where SaleTemplateID=112048";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    },
    'GetTaxTable': function (test) {
        var q;
        q = "select Ack from ebay.trading.GetTaxTable";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.body, 'Success', 'Success expected');
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.done();
            }
        });
    },
    'GetTokenStatus': function (test) {
        var q;
        q = "select TokenStatus from ebay.trading.GetTokenStatus";
        engine.exec(q, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                simpleTest(test,list);
            }
        });
    }
} //close export
