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
    http = require('http'),
    express= require('express'),
    Console = require('../../ql.io-public/modules/console/app.js'),
    //MutableURI = require('ql.io-mutable-uri'),
    EventEmitter = require('events').EventEmitter;
//logger = require('winston');

//logger.remove(logger.transports.Console);
//logger.add(logger.transports.Console, {level: 'error'});

var engine = new Engine({
    tables : __dirname + '/../tables',
    config: __dirname + '/../config/qa.json'
});



module.exports = {
//Check the test with other values in ItemIDs etc
//    'CompleteSale' : function(test) {
//
//        var script = 'obj = { "WarningLevel" : "High",\
//            "FeedbackInfo.CommentType" : "Positive",\
//            "FeedbackInfo.CommentText" : "Wonderful buyer, very fast payment.",\
//            "FeedbackInfo.TargetUser" : "it_newseller",\
//            "ItemID" : "290006864001",\
//            "Paid" : "true",\
//            "Shipment.Notes" : "Shipped USPS Media",\
//            "Shipment.ShipmentTrackingDetails.ShipmentTrackingNumber" : "EA123456789US",\
//            "Shipment.ShipmentTrackingDetails.ShippingCarrierUsed" : "USPS",\
//            "Shipped" : "true",\
//            "TransactionID" : 0,\
//            "RequesterCredentials.eBayAuthToken" : "AgAAAA**AQAAAA**aAAAAA**n5rtTQ**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJkYSmC5KHpAydj6x9nY+seQ**1hwBAA**AAMAAA**senUyiS57CFVkM9eryiP2l8TwnClxlLxZt6eHoN1LR4BItvEGIEGn9TAib32mQZSFQQR2xH9Gtxa2VS0ijESK8WpuCY0QPULHmlQ63+p41/3jG7GCOpqWRIIcNP/qN3lkJHYl6vzxGJZMUiAAdNWJiqJropgb/0fe565C0tiu2cMix11Qxbm6OW+X1Pi8I9M9zHF0pGs68KP7mUkTSYQN50zwOexENgsfXGx6SJXo+qYlLm/oXS3PWl3JXfpiq3WbngOcpY6D6jgHO9eaxHhfsiQK0vDxC68llWY52o19BPqMHMFZKTtO2uLf7VolbyD5VE5HOONThxmvcz9I3l0eJWDCuYA0l5ltWaHOZHDhaR0pgWdQUPpW2cE1ZbQ+gz+m6zOP96y3+kl6DREj2cg9N7xXqe4f/tfX0eCK9zqkIukd1NMfZzXtJ9kWHStIElCSTf/BmcsCRsJuPrPo9hfzJT574oVhyqieu2fB9IsV0yIZyGqP8CFYjthibyy/3+RGbev335brqW59o8pcqd4+K9ScWeygmDRd4nAZ0jPUr/oS1nh3IlP7in/tXEL6m78g9OHVh9dPSWgMa7F+y3YLvesbksafonWCxTWCnpRGxYGFHHGro/uZNVFnfrCbHwMkCALI7Awe+vZYLu2AKEtBqdaauIv1sv893zszDck7R80H5uczYgOsWiqU1BHLvZluv+Uzg48wxL1O1cdhj0OmLvC6ABCtA1BsSMB9pLOplqdTq/Rao797K9Bz59YoG95",\
//            "WarningLevel" : "High"\
//            };\
//            update ebay.trading.CompleteSale with "{obj}";';
//
//        engine.exec(script  , function (err, list) {
//            if (err) {
//                test.fail('got error: ' + err.stack || err);
//                test.done();
//            }
//            else {
//                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
//                test.equals(list.body.Ack, 'Success', 'Success expected');
//                test.done();
//            }
//        });
//    },

    'ReviseMyMessages': function(test) {
        var script = 'id = select Messages.Message[0].MessageID from ebay.trading.GetMyMessages where DetailLevel = "ReturnHeaders";\
                      msg = {  \
                            "WarningLevel" : "High", \
                            "MessageIDs.MessageID" : "{id}",\
                            "Read" : "true", \
                            "Flagged" : "true",\
                            "WarningLevel" : "High" \
                             } \
                      update ebay.trading.ReviseMyMessages with "{msg}" ;';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
    'ReviseMyMessagesFolders': function(test) {
        var script = 'FolderID = select Summary.FolderSummary[3].FolderID from ebay.trading.GetMyMessages where DetailLevel = "ReturnSummary";\
                      msg = { \
                            "WarningLevel" : "High",\
                            "Operation" : "Rename",\
                            "FolderID" : "{FolderID}",\
                            "FolderName" : "Classified",\
                            "WarningLevel" : "High"\
                             }\
                      return update ebay.trading.ReviseMyMessagesFolders with "{msg}"';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
//Need a new ItemID everytime
    'ReviseInventoryStatus': function(test) {
        var script = 'msg = {\
                            "ErrorLanguage" : "en_US",\
                            "WarningLevel" : "High",\
                            "InventoryStatus.ItemID" : "290006866508",\
                            "InventoryStatus.Quantity" : "70",\
                            "WarningLevel" : "High"\
                            }\
                            update ebay.trading.ReviseInventoryStatus with "{msg}"';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
//Will work only once...will need to change the title everytime the test is run
    'ReviseFixedPriceItem': function(test) {
        var script = 'msg = { \
                        "ErrorLanguage" : "en_US", \
                        "WarningLevel" : "High",\
                        "Item.ItemID" : "290006874063",\
                        "Item.Title" : "Ql.io-BOOK HP",\
                        "WarningLevel" : "High"\
                        }\
                       update ebay.trading.ReviseFixedPriceItem with "{msg}" ';
        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
//Need a new FixedPriceItem ItemID for every call. Hence will run with Success only once. AddFixedPriceItem call errors out with unmatching soap env error.
    'EndFixedPriceItem': function(test) {
        var script = 'msg = { \
                     "ItemID" : "290006874108",\
                     "EndingReason" : "Incorrect",\
                     "WarningLevel" : "High"\
                     }\
                     update ebay.trading.EndFixedPriceItem with "{msg}"';
        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
    'EndItem': function(test) {
        var script = 'result = insert into ebay.trading.AddItem values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                    <AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                        <ErrorLanguage>en_US</ErrorLanguage>\n\
                        <WarningLevel>High</WarningLevel>\n\
                        <Item><Title>Harry Potter and the Philosophers Stone</Title>\n\
                            <Description>This is the first book in the Harry Potter series. In excellent condition!</Description>\n\
                            <PrimaryCategory>\n\
                                <CategoryID>377</CategoryID>\n\
                            </PrimaryCategory>\n\
                            <StartPrice>1.00</StartPrice>\n\
                            <ConditionID>3000</ConditionID>\n\
                            <CategoryMappingAllowed>true</CategoryMappingAllowed>\n\
                            <Country>US</Country>\n\
                            <Currency>USD</Currency>\n\
                            <DispatchTimeMax>3</DispatchTimeMax>\n\
                            <ListingDuration>Days_7</ListingDuration>\n\
                            <ListingType>Chinese</ListingType>\n\
                            <PaymentMethods>PayPal</PaymentMethods>\n\
                            <PayPalEmailAddress>magicalbookseller@yahoo.com</PayPalEmailAddress>\n\
                            <PictureDetails>\n\
                                <PictureURL>http://i.ebayimg.sandbox.ebay.com/00/s/MTAwMFg2NjA=/$(KGrHqJHJEsE-js(zPJ)BP)cWCLLSQ~~60_1.JPG?set_id=8800005007</PictureURL>\n\
                            </PictureDetails>\n\
                            <PostalCode>95125</PostalCode>\n\
                            <Quantity>1</Quantity>\n\
                            <ReturnPolicy>\n\
                                <ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>\n\
                                <RefundOption>MoneyBack</RefundOption>\n\
                                <ReturnsWithinOption>Days_30</ReturnsWithinOption>\n\
                                <Description>\n\
                                This is the first book in the Harry Potter series. In excellent condition!\n\
                                </Description>\n\
                                <ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>\n\
                            </ReturnPolicy>\n\
                            <ShippingDetails>\n\
                                <ShippingType>Flat</ShippingType>\n\
                                <ShippingServiceOptions>\n\
                                    <ShippingServicePriority>1</ShippingServicePriority>\n\
                                    <ShippingService>USPSMedia</ShippingService>\n\
                                    <ShippingServiceCost>2.50</ShippingServiceCost>\n\
                                </ShippingServiceOptions>\n\
                            </ShippingDetails>\n\
                            <Site>US</Site>\n\
                        </Item>\n\
                        <RequesterCredentials>\n\
                            <Username>apitest1</Username>\n\
                            <Password>ebay</Password>\n\
                        </RequesterCredentials>\n\
                        <WarningLevel>High</WarningLevel>\n\
                    </AddItemRequest>\');\
                    msg = {  \
                    "WarningLevel" : "High",  \
                    "EndingReason" : "NotAvailable", \
                    "WarningLevel" : "High",\
                    "ItemID" : "{result.ItemID}" \
                    }\
                    update ebay.trading.EndItem with "{msg}"';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
    'ReviseSellingManagerProduct': function(test) {
        var script = 'result = insert into ebay.trading.AddSellingManagerProduct values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                      <AddSellingManagerProductRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                          <Version>737</Version>\n\
                          <RequesterCredentials>\n\
                              <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**HQ7MTw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJnY+gD5iEqASdj6x9nY+seQ**tgAAAA**AAMAAA**cwQAqqrC/U2iO7gRA59MtUyHRcTVcPdhNmDsfCHf0YAWr3D3GYPmZMldTzVVf5OzY/BWljM1vasll03VN5FKGvtni4FdjZ0U9P1jSIHNcn5TWq1L7k+Le6CH60dSW+8+THdfenGt+cXBS4k55/dA7/xOF1Q04eNMJ4vENr7vykQ69AnEW70z77pDQnVWCUd9dqRiJ+JlP1ixpbG/eN5PEhEp13UXLSHkUxrUR6MxqEWfFlh/geTkhyCLYv8KOWEByC8soInlJaMlv9QY8LSxxgspHvyz8gRYYUg5xaIeyHBpC06mocl2vOZk07s1unWPynU2Hbp7zd+AK3i0Dsx8KUoVehygsCQywajVFFCyA18+mwi3E70efLbQVD8FsO9U0jlrie4S9nO7FlTGAwqbA2878VgjOWUdVqOnCsza0ft5r0Hwt/96aMMh17Cwn5EFD+eaVaAGl2WLFmGt7kFXnX/l+bIvjM0GbaftHKDM1YopPCnCqKKZrw9JKLmyoc5h0wHg5vEGOVfsfacSl+oNWi8sxKA5f+xwZqRa8oK749TBdNEtYvtXY6kAUFEcWfu9Y/0cqfDhZkMhCPgCKx/VIJNEuESOQqI+J7Gvwd0l8CfGqX7fjLs3Npzgy8IU5An5T+Ah7sdGXJQLK5dWQFYU0uC20FCAQiNBS5IcpzIdIAyqyEkA/0xdXq0PWBzf022syx06kA3TPErBpsLHIrKaxXXfj0cAbL15M5JwjEYF+CmBHoqJSrJvohhW9azNkurj</eBayAuthToken>\n\
                          </RequesterCredentials>\n\
                          <SellingManagerProductDetails>\n\
                              <ProductName>Harry Potter Book4</ProductName>\n\
                              <QuantityAvailable>50</QuantityAvailable>\n\
                              <FolderID>4651612545</FolderID>\n\
                          </SellingManagerProductDetails>\n\
                      </AddSellingManagerProductRequest>\');\
                      msg = { \
                            "Version" : "737",\
                            "SellingManagerProductDetails.ProductName" : "Harry Potter Book4", \
                            "SellingManagerProductDetails.ProductID" : "{result.SellingManagerProductDetails.ProductID}" \
                            }\
                      update ebay.trading.ReviseSellingManagerProduct with "{msg}"';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
    'ReviseSellingManagerInventoryFolder': function(test) {
        var script = 'result = insert into ebay.trading.AddSellingManagerInventoryFolder (ParentFolderID, FolderName, Comment) values ("6003420018","HarryTrial","for HP");\
                      msg = {    \
                            "Version" : "737", \
                            "Folder.FolderID" : "{result.FolderID}", \
                            "Folder.FolderName" : "Harry Potter Books",\
                            "Folder.Comment" : "Contains Harry Potter Book Templates" \
                            }\
                      update ebay.trading.ReviseSellingManagerInventoryFolder with "{msg}"';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
    'MoveSellingManagerInventoryFolder': function(test) {
        var script = 'result = insert into ebay.trading.AddSellingManagerInventoryFolder (ParentFolderID, FolderName, Comment) values ("6006427018","testql.io","for HP");\
                      msg = {\
                        "Version" : "737", \
                        "FolderID" : "{result.FolderID}", \
                        "NewParentFolderID" : "6007435018" \
                        }\
                      update ebay.trading.MoveSellingManagerInventoryFolder with "{msg}"  ';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
//Get TransactionID from GetOrderTransaction.
    'ReviseCheckoutStatus': function(test) {
        var script = 'msg = { \
                        "AdjustmentAmount" : "10", \
                        "AmountPaid.currencyID" : "USD",  \
                        "AmountPaid" : "1000",       \
                        "CODCost.currencyID" : "USD",   \
                        "CODCost" : "70", \
                        "ItemID" : "9600665376",\
                        "CheckoutStatus" : "Complete", \
                        "TransactionID": "7914710019", \
                        "SalesTax.currencyID" : "USD", \
                        "SalesTax" : "1",\
                        "ShippingCost.currencyID" : "USD",\
                        "ShippingCost" : "1",\
                        "ShippingInsuranceCost.currencyID" : "USD",\
                        "ShippingInsuranceCost" : "1",\
                        "PaymentMethodUsed" : "CashInPerson"\
                        }\
                        update ebay.trading.ReviseCheckoutStatus with "{msg}"';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
    'SellerReverseDispute': function(test) {
        var script = 'result = select DisputeArray.Dispute.DisputeID from ebay.trading.GetUserDisputes;\
                        msg = {  \
                            "DisputeID" : "{result}",   \
                            "DisputeResolutionReason" : "OtherResolution"  \
                        }                                \
                        update ebay.trading.SellerReverseDispute with "{msg}"';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
    'SetUserNotes': function(test) {
        var script = 'result = insert into ebay.trading.AddItem values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                    <AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                        <ErrorLanguage>en_US</ErrorLanguage>\n\
                        <WarningLevel>High</WarningLevel>\n\
                        <Item><Title>Harry Potter and the Philosophers Stone</Title>\n\
                            <Description>This is the first book in the Harry Potter series. In excellent condition!</Description>\n\
                            <PrimaryCategory>\n\
                                <CategoryID>377</CategoryID>\n\
                            </PrimaryCategory>\n\
                            <StartPrice>1.00</StartPrice>\n\
                            <ConditionID>3000</ConditionID>\n\
                            <CategoryMappingAllowed>true</CategoryMappingAllowed>\n\
                            <Country>US</Country>\n\
                            <Currency>USD</Currency>\n\
                            <DispatchTimeMax>3</DispatchTimeMax>\n\
                            <ListingDuration>Days_7</ListingDuration>\n\
                            <ListingType>Chinese</ListingType>\n\
                            <PaymentMethods>PayPal</PaymentMethods>\n\
                            <PayPalEmailAddress>magicalbookseller@yahoo.com</PayPalEmailAddress>\n\
                            <PictureDetails>\n\
                                <PictureURL>http://i.ebayimg.sandbox.ebay.com/00/s/MTAwMFg2NjA=/$(KGrHqJHJEsE-js(zPJ)BP)cWCLLSQ~~60_1.JPG?set_id=8800005007</PictureURL>\n\
                            </PictureDetails>\n\
                            <PostalCode>95125</PostalCode>\n\
                            <Quantity>1</Quantity>\n\
                            <ReturnPolicy>\n\
                                <ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>\n\
                                <RefundOption>MoneyBack</RefundOption>\n\
                                <ReturnsWithinOption>Days_30</ReturnsWithinOption>\n\
                                <Description>\n\
                                This is the first book in the Harry Potter series. In excellent condition!\n\
                                </Description>\n\
                                <ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>\n\
                            </ReturnPolicy>\n\
                            <ShippingDetails>\n\
                                <ShippingType>Flat</ShippingType>\n\
                                <ShippingServiceOptions>\n\
                                    <ShippingServicePriority>1</ShippingServicePriority>\n\
                                    <ShippingService>USPSMedia</ShippingService>\n\
                                    <ShippingServiceCost>2.50</ShippingServiceCost>\n\
                                </ShippingServiceOptions>\n\
                            </ShippingDetails>\n\
                            <Site>US</Site>\n\
                        </Item>\n\
                        <RequesterCredentials>\n\
                            <Username>apitest1</Username>\n\
                            <Password>ebay</Password>\n\
                        </RequesterCredentials>\n\
                        <WarningLevel>High</WarningLevel>\n\
                    </AddItemRequest>\'); \
                    msg = { \
                        "ItemID" : "{result.ItemID}",  \
                        "Action" : "AddOrUpdate",   \
                        "NoteText" : "For birthday", \
                        "WarningLevel" : "High" \
                    } \
                   update ebay.trading.SetUserNotes with "{msg}"';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    },
    'SetTaxTable': function(test) {
        var script = 'msg = { \
                            "TaxTable.TaxJurisdiction.JurisdictionID" : "CA",  \
                                "TaxTable.TaxJurisdiction.SalesTaxPercent" : "8.25",    \
                                "TaxTable.TaxJurisdiction.ShippingIncludedInTax" : "true", \
                                "TaxTable.TaxJurisdiction.JurisdictionID" : "MI",  \
                                "TaxTable.TaxJurisdiction.SalesTaxPercent" : "6.0", \
                                "TaxTable.TaxJurisdiction.ShippingIncludedInTax" : "false"  \
                            } \
                      update ebay.trading.SetTaxTable with "{msg}" ';

        engine.exec(script  , function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.done();
            }
        });
    }
}