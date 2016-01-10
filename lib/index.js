'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = main;

var _url = require('url');

var url = _interopRequireWildcard(_url);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function main(callback) {
    var username = process.env.GITHUB_USERNAME;
    var accessToken = process.env.GITHUB_ACCESS_TOKEN;
    var urlObj = url.parse('https://api.github.com/users/' + username);
    urlObj.query = { access_token: accessToken };
    var urlString = url.format(urlObj);
    (0, _nodeFetch2.default)(urlString, {}).then(function (response) {
        return response.json();
    }).then(function (json) {
        return {
            'GitHub Followers': json.followers,
            'GitHub Following': json.following,
            'GitHub Public Repos': json.public_repos,
            'GitHub Public Gists': json.public_gists
        };
    }).then(function (counts) {
        return callback(null, counts);
    }, callback);
}