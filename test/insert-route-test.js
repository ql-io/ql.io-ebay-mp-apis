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
 */

"use strict"

var _ = require('../node_modules/ql.io-compiler/node_modules/underscore/underscore'),
    Console = require('../../ql.io-public/modules/console/app.js'),
    http = require('http'),
    express = require('express'),
    url = require('url');

module.exports = {
    'opaque': function(test) {
        var c = new Console({
            tables : __dirname + '/../tables',
            routes : __dirname + '/../routes/',
            config : __dirname + '/../config/qa.json',
            'enable console' : false,
            connection : 'close'
        });
        console.log(__dirname)
        c.app.listen(3000, function() {
            var testHttpapp = express.createServer();
            testHttpapp.post('/ping/pong', function(req, res) {
                var data = '';
                req.on('data', function(chunk) {
                    data += chunk;
                });
                req.on('end', function() {
                    res.send(data);
                });
            });

            testHttpapp.listen(80126, function() {
                var mybody = '<?xml version="1.0" encoding="utf-8"?>\n<UploadSiteHostedPicturesRequest xmlns="urn:ebay:apis:eBLBaseComponents">\n\
        <ExternalPictureURL>http://developer.ebay.com/DevZone/XML/docs/images/hp_book_image.jpg</ExternalPictureURL> \n\
        <PictureName>HarryPotterPic-1</PictureName>\n\
            <RequesterCredentials>\n\
            <eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**mRsvTg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wFk4CoAZeHowmdj6x9nY+seQ**2oQBAA**AAMAAA**4zft+pfZAUlEDvEbfasDfR4BwoxjEoWAwxvvykdZ/7il08ZLxfgiAj/bQujsZy0NteI7lKg2+MA25CY0LDfjA/YoPdhVCa0eu+BvgSLM+qigoWmA2A/81bRDs7i6pU3F2hXTGdToAkFpsTCec9G4H0LHpfu63mr9fS07rqXgaCIxG/JbiWfrv1QV6jAYrUPlQUWwL9z7+YQhy/l2bxGiW2QxlPmiWqjqZn3F+fOBUTHIeP5/BBKteHnQd7TvvMCV2vnIeckLUuXRF/hrG1kXn6v8r2FZzj4vIN0FZlDVZHHQpEVR6EhYNaeeLtSsSVp0kW0Ebt5cqKfGhW/I8L5jR3ZkyBFq03y3Z8qQ2d5chEERBg4Hf72+pZVSLmJ4T1KDtTIATfHlGBxghLiHEdlOLjhGtk4hQPaZlb+DB3eCOUJAjs7VrCYUAmofEgjLqOSmQ+7M48WmQ48a3F3BPEqpG3CpiqZcKzKkVxeu43MkzyeG+VNK7mPc+Zlgn6jJxQPTCMMw4P2fhJ6qU+cGfbsijUvqOSICWcbgEjlVKEsBWNuPLPrav9ELzQSNwYwYxsO46HqrNCC6kQx4pk1AagOTV22JpNIoSijTZecVJDin/NHqKmT92HizkuYDIHvRCoWnQIoZ1xh5qetuTkSEgnR+Kl/3mQnK4Gu5pHK4sJYBhneOe8N9Q7Q0Tam5yPyQ4uhrt9TOXtgPVXvJ5ZPBJ3TM6lZktWJq8wlViXQDFPjQhd/QcYfUH8nsoPbwBwld3E86</eBayAuthToken>\n\
        </RequesterCredentials>\n\
        </UploadSiteHostedPicturesRequest>'
                var mypath = '/ebay/trading/opaque?body='+mybody
                var options = {
                    host : 'localhost',
                    port : 3000,
                    //path: '/uploadpic',
                    path : '/ebay/trading/opaque',
                    //path: '/ping/pong',
                    method : 'POST',
                    headers : {
                        'content-type' : 'opaque'//'application/xml'
                        //'opaque' : true
                    }

                };
                var req = http.request(options);
                req.addListener('response', function(resp) {
                    var data = '';
                    resp.addListener('data', function(chunk) {
                        data += chunk;
                    });
                    resp.addListener('end', function() {
                        try{
                            var json = JSON.parse(data);
                        }catch (e){
                            test.ok(false, "response is not json")
                        }
                        test.equal(json.Ack, "Success");
                        c.app.close();
                        testHttpapp.close();
                        test.done();
                    });
                });
                req.write(mybody);
                //req.opaque = true;
                //req.body = 'opaque'
                req.end();

            });
        });
    }
}