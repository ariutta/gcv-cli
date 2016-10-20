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

var fs = require('fs');
var hl = require('highland');
var isUrl = require('is-url');
var request = require('request');

var API_KEY = process.env.GCV_API_KEY;

var getFile = function(filepath) {
  return isUrl(filepath) ? request(filepath) : fs.createReadStream(filepath);
}

module.exports = function(filepath, type) {
  var url = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;

  return hl(getFile(filepath))
  .collect()
  .map((chunks) => Buffer.concat(chunks).toString('base64'))
  .map(function(b64data) {
    return {
      requests: [{
        image: {content: b64data},
        features: [{'type': type}]
      }]
    };
  })
  .map(JSON.stringify)
  .flatMap(function(body) {
    var options = {
      method: 'POST',
      url: url,
      body: body,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return hl(request(options));
  });
};
