/**
 * Copyright 2016 Google Inc. All rights reserved.
 * modified from
 * https://github.com/GoogleCloudPlatform/
 *    machine-learning-browser-extension/blob/master/chrome/background.js
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var config = require('./config.json');
var fs = require('fs');
var request = require('request');

var API_KEY = config.key;

// http makes an HTTP request and calls callback with parsed JSON.
var http = function(method, url, body, cb) {
  var options = {
    method: method,
    url: url,
    body: body,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  request(options, function(err, response, body) {
    if (err) {
      return cb(err, JSON.parse(body));
    }
    if (response.statusCode === 200) {
      return cb(null, JSON.parse(body));
    }
  });
};

// detect makes a Cloud Vision API request with the API key.
var detect = function(type, b64data, cb) {
  var url = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;
  var data = {
    requests: [{
      image: {content: b64data},
      features: [{'type': type}]
    }]
  };
  http('POST', url, JSON.stringify(data), cb);
};

var b64 = function(filepath, cb) {
  // read binary data
  fs.readFile(filepath, function(err, bitmap) {
    if (err) {
      return cb(err, bitmap);
    }
    // convert binary data to base64 encoded string
    return cb(null, new Buffer(bitmap).toString('base64'));
  });
};

var ocr = function(filepath, cb) {
  b64(filepath, function(err, b64data) {
    if (err) {
      return cb(err, b64data);
    }
    detect('TEXT_DETECTION', b64data, function(err, data) {
      if (err) {
        return cb(err, data);
      }
      return cb(null, data);
    });
  });
};

module.exports = {
  ocr: ocr
};
