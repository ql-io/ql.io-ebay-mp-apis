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
    'simple': function (test){
        var q = 'foo = \'wii\';\nreturn select * from ebay.finding.findItemsByKeywords where keywords = "{foo}"'
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
    'pair insert':function (test) {
        var q = 'insert into ebay.trading.UploadSiteHostedPictures (ExternalPictureURL) values("http://developer.ebay.com/DevZone/XML/docs/images/hp_book_image.jpg")';
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
    'opaque insert':function (test) {
        var q;
        //q = "select * from ebay.finding.findItemsByImage where itemId = 120896726588 and paginationInput.entriesPerPage = 2";
        q = 'insert into ebay.trading.UploadSiteHostedPictures values (\'<?xml version="1.0" encoding="utf-8"?>\n<UploadSiteHostedPicturesRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
        <ExternalPictureURL>http://developer.ebay.com/DevZone/XML/docs/images/hp_book_image.jpg</ExternalPictureURL> \n\
        <PictureName>HarryPotterPic-1</PictureName>\n\
            <RequesterCredentials>\n\
            <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**mRsvTg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wFk4CoAZeHowmdj6x9nY+seQ**2oQBAA**AAMAAA**4zft+pfZAUlEDvEbfasDfR4BwoxjEoWAwxvvykdZ/7il08ZLxfgiAj/bQujsZy0NteI7lKg2+MA25CY0LDfjA/YoPdhVCa0eu+BvgSLM+qigoWmA2A/81bRDs7i6pU3F2hXTGdToAkFpsTCec9G4H0LHpfu63mr9fS07rqXgaCIxG/JbiWfrv1QV6jAYrUPlQUWwL9z7+YQhy/l2bxGiW2QxlPmiWqjqZn3F+fOBUTHIeP5/BBKteHnQd7TvvMCV2vnIeckLUuXRF/hrG1kXn6v8r2FZzj4vIN0FZlDVZHHQpEVR6EhYNaeeLtSsSVp0kW0Ebt5cqKfGhW/I8L5jR3ZkyBFq03y3Z8qQ2d5chEERBg4Hf72+pZVSLmJ4T1KDtTIATfHlGBxghLiHEdlOLjhGtk4hQPaZlb+DB3eCOUJAjs7VrCYUAmofEgjLqOSmQ+7M48WmQ48a3F3BPEqpG3CpiqZcKzKkVxeu43MkzyeG+VNK7mPc+Zlgn6jJxQPTCMMw4P2fhJ6qU+cGfbsijUvqOSICWcbgEjlVKEsBWNuPLPrav9ELzQSNwYwYxsO46HqrNCC6kQx4pk1AagOTV22JpNIoSijTZecVJDin/NHqKmT92HizkuYDIHvRCoWnQIoZ1xh5qetuTkSEgnR+Kl/3mQnK4Gu5pHK4sJYBhneOe8N9Q7Q0Tam5yPyQ4uhrt9TOXtgPVXvJ5ZPBJ3TM6lZktWJq8wlViXQDFPjQhd/QcYfUH8nsoPbwBwld3E86</eBayAuthToken>\n\
        </RequesterCredentials>\n\
        </UploadSiteHostedPicturesRequest>\')'


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

    'AddToWatchList' : function(test) {


        var script = 'itemId = select searchResult.item.itemId from ebay.finding.findItemsByKeywordsQA where keywords = "camera" and itemFilter.name = "EndTimeTo" and itemFilter.value = "2015-08-04T19:09:02.768Z" and paginationInput.entriesPerPage = 1;\
                      return insert into ebay.trading.AddToWatchList (ItemID) values ("{itemId}") ;';

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
    'RemoveFromWatchList' : function(test) {

        var script = 'itemId = select searchResult.item.itemId from ebay.finding.findItemsByKeywordsQA where keywords = "camera" and itemFilter.name = "EndTimeTo" and itemFilter.value = "2015-08-04T19:09:02.768Z" and paginationInput.entriesPerPage = 1;\
                      return delete from ebay.trading.RemoveFromWatchList where ItemID in ("{itemId}");';

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
    'AddMemberMessageAAQToPartner' : function(test) {



        var script = 'insert into ebay.trading.AddMemberMessageAAQToPartner (ItemID , MemberMessage.Subject, MemberMessage.Body, MemberMessage.QuestionType, MemberMessage.RecipientID)' +
                     'values ("290006652076", "Thank You for your purchase", "We appreciate your business and hope you enjoy your book.", "General", "egw.us.seller51");';

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

    'AddMemberMessageRTQ': function(test) {


        var script = 'result = select * from ebay.trading.GetMemberMessages where MailMessageType = "All" and ItemID = 290006316857;\
                      parentmessageid = "{result.MemberMessage.MemberMessageExchange.Question.MessageID}";\
                      return insert into ebay.trading.AddMemberMessageRTQ (ItemID, MemberMessage.Body, MemberMessage.RecipientID, MemberMessage.ParentMessageID) values ("290006316857","We appreciate your business and hope you enjoy your book.","apitest20", "{parentmessageid}") ; ' ;

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

    } ,
//Currently getting Error Code: 10007 : internal error to app from ebay server side.
//    'AddMemberMessagesAAQToBidder': function(test) {
//
//
//        var script = 'return insert into ebay.trading.AddMemberMessageRTQ (AddMemberMessagesAAQToBidderRequestContainer.ItemID, AddMemberMessagesAAQToBidderRequestContainer.MemberMessage.Body, AddMemberMessagesAAQToBidderRequestContainer.MemberMessage.RecipientID) values ("290006708343","Not accepting you offer","apitest20") ' ;
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
//
//    }
//    'AddSecondChanceItem': function(test) {
//
//
//        var script = 'return insert into ebay.trading.AddSecondChanceItem (ItemID, SellerMessage, RecipientBidderUserID, Duration) values ("290006708342","Not accepting your offer","apitest10", "Days_7") ' ;
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
//
//    }
    'Add+DeleteSellingManagerInventoryFolder' : function(test) {
        var script = 'result = insert into ebay.trading.AddSellingManagerInventoryFolder (ParentFolderID, FolderName, Comment) values ("6003420018","HarryTrial","for HP");\
                      return delete from ebay.trading.DeleteSellingManagerInventoryFolder where FolderID in ("{result.FolderID}");';

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
    'Add+DeleteSellingManagerProduct' : function (test) {
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
                      prodID = "{result.SellingManagerProductDetails.ProductID}";\
                      return delete from ebay.trading.DeleteSellingManagerProduct where ProductID = "{prodID}"; '

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
    'SetMessagePreferences' : function (test) {
        var script = 'result = insert into ebay.trading.SetMessagePreferences values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                      <SetMessagePreferencesRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                      <RequesterCredentials>\n\
                      <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**HQ7MTw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJnY+gD5iEqASdj6x9nY+seQ**tgAAAA**AAMAAA**cwQAqqrC/U2iO7gRA59MtUyHRcTVcPdhNmDsfCHf0YAWr3D3GYPmZMldTzVVf5OzY/BWljM1vasll03VN5FKGvtni4FdjZ0U9P1jSIHNcn5TWq1L7k+Le6CH60dSW+8+THdfenGt+cXBS4k55/dA7/xOF1Q04eNMJ4vENr7vykQ69AnEW70z77pDQnVWCUd9dqRiJ+JlP1ixpbG/eN5PEhEp13UXLSHkUxrUR6MxqEWfFlh/geTkhyCLYv8KOWEByC8soInlJaMlv9QY8LSxxgspHvyz8gRYYUg5xaIeyHBpC06mocl2vOZk07s1unWPynU2Hbp7zd+AK3i0Dsx8KUoVehygsCQywajVFFCyA18+mwi3E70efLbQVD8FsO9U0jlrie4S9nO7FlTGAwqbA2878VgjOWUdVqOnCsza0ft5r0Hwt/96aMMh17Cwn5EFD+eaVaAGl2WLFmGt7kFXnX/l+bIvjM0GbaftHKDM1YopPCnCqKKZrw9JKLmyoc5h0wHg5vEGOVfsfacSl+oNWi8sxKA5f+xwZqRa8oK749TBdNEtYvtXY6kAUFEcWfu9Y/0cqfDhZkMhCPgCKx/VIJNEuESOQqI+J7Gvwd0l8CfGqX7fjLs3Npzgy8IU5An5T+Ah7sdGXJQLK5dWQFYU0uC20FCAQiNBS5IcpzIdIAyqyEkA/0xdXq0PWBzf022syx06kA3TPErBpsLHIrKaxXXfj0cAbL15M5JwjEYF+CmBHoqJSrJvohhW9azNkurj</eBayAuthToken>\n\
                      </RequesterCredentials>\n\
                      <ASQPreferences>\n\
                      <Subject>Question about how to pay for this item</Subject>\n\
                      <Subject>Question about combined shipping for multiple items</Subject>\n\
                      <Subject>Question about shipping for this item</Subject>\n\
                      <Subject>General question about this item</Subject>\n\
                      <Subject>Question about item condition</Subject>\n\
                      <Subject>Question about book Edition</Subject>\n\
                      </ASQPreferences>\n\
                      </SetMessagePreferencesRequest>\')'

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
    'SetNotificationPreferences' : function (test) {
        var script = 'result = insert into ebay.trading.SetMessagePreferences values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                      <SetNotificationPreferencesRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                      <ApplicationDeliveryPreferences>\n\
                      <AlertEmail>mailto://magicalbookseller@yahoo.com</AlertEmail>\n\
                      <AlertEnable>Enable</AlertEnable>\n\
                      <ApplicationEnable>Enable</ApplicationEnable>\n\
                      <ApplicationURL>mailto://magicalbookseller@yahoo.com</ApplicationURL>\n\
                      <DeviceType>Platform</DeviceType>\n\
                      </ApplicationDeliveryPreferences>\n\
                      <UserDeliveryPreferenceArray>\n\
                      <NotificationEnable><EventType>BidReceived</EventType>\n\
                      <EventEnable>Enable</EventEnable>\n\
                      </NotificationEnable>\n\
                      <NotificationEnable><EventType>Feedback</EventType>\n\
                      <EventEnable>Enable</EventEnable>\n\
                      </NotificationEnable>\n\
                      <NotificationEnable><EventType>EndOfAuction</EventType>\n\
                      <EventEnable>Enable</EventEnable>\n\
                      </NotificationEnable>\n\
                      <NotificationEnable><EventType>ItemListed</EventType>\n\
                      <EventEnable>Enable</EventEnable>\n\
                      </NotificationEnable>\n\
                      </UserDeliveryPreferenceArray>\n\
                      </SetNotificationPreferencesRequest>\')'

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
    'Set+DeleteSellingManagerItemAutomationRule' : function (test) {
        var script = 'result = insert into ebay.trading.SetSellingManagerItemAutomationRule values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                     <SetSellingManagerItemAutomationRuleRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                     <RequesterCredentials>\n\
                     <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**HQ7MTw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJnY+gD5iEqASdj6x9nY+seQ**tgAAAA**AAMAAA**cwQAqqrC/U2iO7gRA59MtUyHRcTVcPdhNmDsfCHf0YAWr3D3GYPmZMldTzVVf5OzY/BWljM1vasll03VN5FKGvtni4FdjZ0U9P1jSIHNcn5TWq1L7k+Le6CH60dSW+8+THdfenGt+cXBS4k55/dA7/xOF1Q04eNMJ4vENr7vykQ69AnEW70z77pDQnVWCUd9dqRiJ+JlP1ixpbG/eN5PEhEp13UXLSHkUxrUR6MxqEWfFlh/geTkhyCLYv8KOWEByC8soInlJaMlv9QY8LSxxgspHvyz8gRYYUg5xaIeyHBpC06mocl2vOZk07s1unWPynU2Hbp7zd+AK3i0Dsx8KUoVehygsCQywajVFFCyA18+mwi3E70efLbQVD8FsO9U0jlrie4S9nO7FlTGAwqbA2878VgjOWUdVqOnCsza0ft5r0Hwt/96aMMh17Cwn5EFD+eaVaAGl2WLFmGt7kFXnX/l+bIvjM0GbaftHKDM1YopPCnCqKKZrw9JKLmyoc5h0wHg5vEGOVfsfacSl+oNWi8sxKA5f+xwZqRa8oK749TBdNEtYvtXY6kAUFEcWfu9Y/0cqfDhZkMhCPgCKx/VIJNEuESOQqI+J7Gvwd0l8CfGqX7fjLs3Npzgy8IU5An5T+Ah7sdGXJQLK5dWQFYU0uC20FCAQiNBS5IcpzIdIAyqyEkA/0xdXq0PWBzf022syx06kA3TPErBpsLHIrKaxXXfj0cAbL15M5JwjEYF+CmBHoqJSrJvohhW9azNkurj</eBayAuthToken>\n\
                     </RequesterCredentials>\n\
                     <Version>737</Version>\n\
                     <ItemID>290005886960</ItemID>\n\
                     <AutomatedRelistingRule>\n\
                     <RelistCondition>RelistImmediately</RelistCondition>\n\
                     </AutomatedRelistingRule>\n\
                     </SetSellingManagerItemAutomationRuleRequest>\');\
                     return delete from ebay.trading.DeleteSellingManagerItemAutomationRule where Version = "737" and DeleteAutomatedRelistingRule = "true" and ItemID = "290005886960" ;'


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
    'SetSellingManagerTemplateAutomationRule' : function (test) {
        var script = 'result = insert into ebay.trading.SetSellingManagerTemplateAutomationRule values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                     <SetSellingManagerTemplateAutomationRuleRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                     <RequesterCredentials>\n\
                        <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**HQ7MTw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJnY+gD5iEqASdj6x9nY+seQ**tgAAAA**AAMAAA**cwQAqqrC/U2iO7gRA59MtUyHRcTVcPdhNmDsfCHf0YAWr3D3GYPmZMldTzVVf5OzY/BWljM1vasll03VN5FKGvtni4FdjZ0U9P1jSIHNcn5TWq1L7k+Le6CH60dSW+8+THdfenGt+cXBS4k55/dA7/xOF1Q04eNMJ4vENr7vykQ69AnEW70z77pDQnVWCUd9dqRiJ+JlP1ixpbG/eN5PEhEp13UXLSHkUxrUR6MxqEWfFlh/geTkhyCLYv8KOWEByC8soInlJaMlv9QY8LSxxgspHvyz8gRYYUg5xaIeyHBpC06mocl2vOZk07s1unWPynU2Hbp7zd+AK3i0Dsx8KUoVehygsCQywajVFFCyA18+mwi3E70efLbQVD8FsO9U0jlrie4S9nO7FlTGAwqbA2878VgjOWUdVqOnCsza0ft5r0Hwt/96aMMh17Cwn5EFD+eaVaAGl2WLFmGt7kFXnX/l+bIvjM0GbaftHKDM1YopPCnCqKKZrw9JKLmyoc5h0wHg5vEGOVfsfacSl+oNWi8sxKA5f+xwZqRa8oK749TBdNEtYvtXY6kAUFEcWfu9Y/0cqfDhZkMhCPgCKx/VIJNEuESOQqI+J7Gvwd0l8CfGqX7fjLs3Npzgy8IU5An5T+Ah7sdGXJQLK5dWQFYU0uC20FCAQiNBS5IcpzIdIAyqyEkA/0xdXq0PWBzf022syx06kA3TPErBpsLHIrKaxXXfj0cAbL15M5JwjEYF+CmBHoqJSrJvohhW9azNkurj</eBayAuthToken>\n\
                     </RequesterCredentials>\n\
                     <WarningLevel>High</WarningLevel>\n\
                     <ErrorHandling>BestEffort</ErrorHandling>\n\
                     <DetailLevel>ReturnAll</DetailLevel>\n\
                     <Version>737</Version>\n\
                     <ErrorLanguage>en_US</ErrorLanguage>\n\
                     <AutomatedListingRule>\n\
                        <ListAccordingToSchedule>\n\
                            <DayOfWeek>Tuesday</DayOfWeek>\n\
                            <DayOfWeek>Wednesday</DayOfWeek>\n\
                            <ListingPeriodInWeeks>1</ListingPeriodInWeeks>\n\
                            <ListAtSpecificTimeOfDay>09:00:00.000Z</ListAtSpecificTimeOfDay>\n\
                            <StartTime>2008-09-16T07:00:00.000Z</StartTime>\n\
                            <MaxActiveItemCount>16</MaxActiveItemCount>\n\
                            <ListingHoldInventoryLevel>6</ListingHoldInventoryLevel>\n\
                        </ListAccordingToSchedule>\n\
                     </AutomatedListingRule>\n\
                     <SaleTemplateID>76155</SaleTemplateID>\n\
                     </SetSellingManagerTemplateAutomationRuleRequest>\');\
                     return delete from ebay.trading.DeleteSellingManagerTemplateAutomationRule where DeleteAutomatedListingRule = "true" and SaleTemplateID = "76155";'

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
    'SetSellingManagerFeedbackOptions' : function (test) {
        var script = 'result = insert into ebay.trading.SetSellingManagerFeedbackOptions values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                     <SetSellingManagerFeedbackOptionsRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                     <RequesterCredentials>\n\
                     <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**HQ7MTw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJnY+gD5iEqASdj6x9nY+seQ**tgAAAA**AAMAAA**cwQAqqrC/U2iO7gRA59MtUyHRcTVcPdhNmDsfCHf0YAWr3D3GYPmZMldTzVVf5OzY/BWljM1vasll03VN5FKGvtni4FdjZ0U9P1jSIHNcn5TWq1L7k+Le6CH60dSW+8+THdfenGt+cXBS4k55/dA7/xOF1Q04eNMJ4vENr7vykQ69AnEW70z77pDQnVWCUd9dqRiJ+JlP1ixpbG/eN5PEhEp13UXLSHkUxrUR6MxqEWfFlh/geTkhyCLYv8KOWEByC8soInlJaMlv9QY8LSxxgspHvyz8gRYYUg5xaIeyHBpC06mocl2vOZk07s1unWPynU2Hbp7zd+AK3i0Dsx8KUoVehygsCQywajVFFCyA18+mwi3E70efLbQVD8FsO9U0jlrie4S9nO7FlTGAwqbA2878VgjOWUdVqOnCsza0ft5r0Hwt/96aMMh17Cwn5EFD+eaVaAGl2WLFmGt7kFXnX/l+bIvjM0GbaftHKDM1YopPCnCqKKZrw9JKLmyoc5h0wHg5vEGOVfsfacSl+oNWi8sxKA5f+xwZqRa8oK749TBdNEtYvtXY6kAUFEcWfu9Y/0cqfDhZkMhCPgCKx/VIJNEuESOQqI+J7Gvwd0l8CfGqX7fjLs3Npzgy8IU5An5T+Ah7sdGXJQLK5dWQFYU0uC20FCAQiNBS5IcpzIdIAyqyEkA/0xdXq0PWBzf022syx06kA3TPErBpsLHIrKaxXXfj0cAbL15M5JwjEYF+CmBHoqJSrJvohhW9azNkurj</eBayAuthToken>\n\
                     </RequesterCredentials>\n\
                     <Version>737</Version>\n\
                     <AutomatedLeaveFeedbackEvent>PaymentReceived</AutomatedLeaveFeedbackEvent>\n\
                     <StoredComments>\n\
                     <StoredCommentText>Prompt payment!</StoredCommentText>\n\
                     <StoredCommentText>Paid quickly!</StoredCommentText>\n\
                     <StoredCommentText>Fast payment!</StoredCommentText>\n\
                     </StoredComments>\n\
                     </SetSellingManagerFeedbackOptionsRequest>\') ;'

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
    'AddItem+Place Offer' : function (test) {
        var script ='result = insert into ebay.trading.AddItem values (\'<?xml version="1.0" encoding="utf-8"?>\n\
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
                        <Username>ql.io-test1</Username>\n\
                        <Password>ebay</Password>\n\
                    </RequesterCredentials>\n\
                    <WarningLevel>High</WarningLevel>\n\
                    </AddItemRequest>\') ; \
                    return insert into ebay.trading.PlaceOffer (ErrorLanguage,EndUserIP,ItemID,Offer.Action, Offer.MaxBid, Offer.Quantity ) values ("en_US", "192.168.255.255", "{result.ItemID}", "Bid", "20.00","1"); '

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
    'AddToItemDescription' : function (test) {
        var script ='result = insert into ebay.trading.AddItem values (\'<?xml version="1.0" encoding="utf-8"?>\n\
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
                    </AddItemRequest>\') ; \
                    return insert into ebay.trading.AddToItemDescription (ItemID, Description, AddToItemDescriptionRequest.RequesterCredentials.Username, AddToItemDescriptionRequest.RequesterCredentials.Password) values ("{result.ItemID}","Adding item desc", "apitest1","ebay"); '

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
    'AddItemFrom+SaveItemToSellingManagerTemplate' : function(test) {

        var script = 'result = insert into ebay.trading.AddItemFromSellingManagerTemplate (Version, SaleTemplateID) values ("737", "206923");\
                      result2 = insert into ebay.trading.AddSellingManagerProduct values (\'<?xml version="1.0" encoding="utf-8"?> \n\
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
                      </AddSellingManagerProductRequest>\'); \
                      return insert into ebay.trading.SaveItemToSellingManagerTemplate (Version, ProductID, ItemID, TemplateName) values ("737","{result2.SellingManagerProductDetails.ProductID}","{result.ItemID}","{result2.SellingManagerProductDetails.ProductName}");'

        engine.exec(script, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.ok(list.body.TemplateID > 0, 'expected some items');
                test.done();
            }
        });

    },
//Will fail on running more than once
    'AddDispute' : function(test) {

        var script = 'insert into ebay.trading.AddDispute (ItemID, TransactionID, DisputeReason, DisputeExplanation) values ("290006727267", "0", "BuyerHasNotPaid", "BuyerHasNotResponded");'

        engine.exec(script, function (err, list) {
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
//Will fail on running more than once
    'LeaveFeedback' : function(test) {

        var script = 'insert into ebay.trading.LeaveFeedback (CommentText, CommentType, TargetUser, ItemID ) values ("Good product","Positive","apitest11", "170004002462")'

        engine.exec(script, function (err, list) {
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
//Will fail on running more than once
    'RelistFixedPriceItem' : function(test) {

        var script = 'result = insert into ebay.trading.RelistFixedPriceItem values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                     <RelistFixedPriceItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                     <ErrorLanguage>en_US</ErrorLanguage>\n\
                     <WarningLevel>High</WarningLevel>\n\
                     <Item>\n\
                     <ItemID>290006662160</ItemID>\n\
                     </Item>\n\
                     <RequesterCredentials>\n\
                     <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**HQ7MTw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJnY+gD5iEqASdj6x9nY+seQ**tgAAAA**AAMAAA**cwQAqqrC/U2iO7gRA59MtUyHRcTVcPdhNmDsfCHf0YAWr3D3GYPmZMldTzVVf5OzY/BWljM1vasll03VN5FKGvtni4FdjZ0U9P1jSIHNcn5TWq1L7k+Le6CH60dSW+8+THdfenGt+cXBS4k55/dA7/xOF1Q04eNMJ4vENr7vykQ69AnEW70z77pDQnVWCUd9dqRiJ+JlP1ixpbG/eN5PEhEp13UXLSHkUxrUR6MxqEWfFlh/geTkhyCLYv8KOWEByC8soInlJaMlv9QY8LSxxgspHvyz8gRYYUg5xaIeyHBpC06mocl2vOZk07s1unWPynU2Hbp7zd+AK3i0Dsx8KUoVehygsCQywajVFFCyA18+mwi3E70efLbQVD8FsO9U0jlrie4S9nO7FlTGAwqbA2878VgjOWUdVqOnCsza0ft5r0Hwt/96aMMh17Cwn5EFD+eaVaAGl2WLFmGt7kFXnX/l+bIvjM0GbaftHKDM1YopPCnCqKKZrw9JKLmyoc5h0wHg5vEGOVfsfacSl+oNWi8sxKA5f+xwZqRa8oK749TBdNEtYvtXY6kAUFEcWfu9Y/0cqfDhZkMhCPgCKx/VIJNEuESOQqI+J7Gvwd0l8CfGqX7fjLs3Npzgy8IU5An5T+Ah7sdGXJQLK5dWQFYU0uC20FCAQiNBS5IcpzIdIAyqyEkA/0xdXq0PWBzf022syx06kA3TPErBpsLHIrKaxXXfj0cAbL15M5JwjEYF+CmBHoqJSrJvohhW9azNkurj</eBayAuthToken>\n\
                     </RequesterCredentials>\n\
                     <WarningLevel>High</WarningLevel>\n\
                     </RelistFixedPriceItemRequest>\') ;'


        engine.exec(script, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.ok(list.body.TemplateID > 0, 'expected some items');
                test.done();
            }
        });

    },
//Will fail on running more than once
    'RelistItem' : function(test) {

        var script = 'result = insert into ebay.trading.RelistItem values (\'<?xml version="1.0" encoding="utf-8"?>\n\
                     <RelistItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
                     <WarningLevel>High</WarningLevel>\n\
                     <ErrorLanguage>en_US</ErrorLanguage>\n\
                     <Item>\n\
                        <ItemID>290006730215</ItemID>\n\
                     </Item>\n\
                     <RequesterCredentials>\n\
                        <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**HQ7MTw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJnY+gD5iEqASdj6x9nY+seQ**tgAAAA**AAMAAA**cwQAqqrC/U2iO7gRA59MtUyHRcTVcPdhNmDsfCHf0YAWr3D3GYPmZMldTzVVf5OzY/BWljM1vasll03VN5FKGvtni4FdjZ0U9P1jSIHNcn5TWq1L7k+Le6CH60dSW+8+THdfenGt+cXBS4k55/dA7/xOF1Q04eNMJ4vENr7vykQ69AnEW70z77pDQnVWCUd9dqRiJ+JlP1ixpbG/eN5PEhEp13UXLSHkUxrUR6MxqEWfFlh/geTkhyCLYv8KOWEByC8soInlJaMlv9QY8LSxxgspHvyz8gRYYUg5xaIeyHBpC06mocl2vOZk07s1unWPynU2Hbp7zd+AK3i0Dsx8KUoVehygsCQywajVFFCyA18+mwi3E70efLbQVD8FsO9U0jlrie4S9nO7FlTGAwqbA2878VgjOWUdVqOnCsza0ft5r0Hwt/96aMMh17Cwn5EFD+eaVaAGl2WLFmGt7kFXnX/l+bIvjM0GbaftHKDM1YopPCnCqKKZrw9JKLmyoc5h0wHg5vEGOVfsfacSl+oNWi8sxKA5f+xwZqRa8oK749TBdNEtYvtXY6kAUFEcWfu9Y/0cqfDhZkMhCPgCKx/VIJNEuESOQqI+J7Gvwd0l8CfGqX7fjLs3Npzgy8IU5An5T+Ah7sdGXJQLK5dWQFYU0uC20FCAQiNBS5IcpzIdIAyqyEkA/0xdXq0PWBzf022syx06kA3TPErBpsLHIrKaxXXfj0cAbL15M5JwjEYF+CmBHoqJSrJvohhW9azNkurj</eBayAuthToken>\n\
                     </RequesterCredentials>\n\
                     <WarningLevel>High</WarningLevel>\n\
                     </RelistItemRequest>\') ;'


        engine.exec(script, function (err, list) {
            if (err) {
                test.fail('got error: ' + err.stack || err);
                test.done();
            }
            else {
                test.equals(list.headers['content-type'], 'application/json', 'HTML expected');
                test.equals(list.body.Ack, 'Success', 'Success expected');
                test.ok(list.body.TemplateID > 0, 'expected some items');
                test.done();
            }
        });

    },
    'DeleteMyMessages' :function(test) {

        var script = 'msgid = select Messages.Message[0].MessageID from ebay.trading.GetMyMessages where DetailLevel = "ReturnHeaders";\
                      return delete from ebay.trading.DeleteMyMessages where MessageIDs.MessageID = "{msgid}";'

        engine.exec(script, function (err, list) {
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
    'UploadSiteHostedPictures' :function(test) {
        var script = 'msg = { \
                            "WarningLevel" : "High", \
                            "ExternalPictureURL" : "http://developer.ebay.com/DevZone/XML/docs/images/hp_book_image.jpg",\
                            "PictureName" : "HarryPotterPic-1", \
                            "WarningLevel" : "High"\
                            }\
                        insert "{msg}" into ebay.trading.UploadSiteHostedPictures'

        engine.exec(script, function (err, list) {
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