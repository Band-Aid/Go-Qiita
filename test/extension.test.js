/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const assert = require('assert');
const {
    parseOptions,
    stringifyOptions,
    toQiitaPayload,
    toQiitaTags,
} = require('../json-handler');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const vscode = require('vscode');
// const myExtension = require('../extension');

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function() {

    // Defines a Mocha unit test
    test("Something 1", function() {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });

    test("parseOptions normalizes valid metadata JSON", function() {
        const options = parseOptions('{"id":"item-id","private":false,"tags":["go","qiita"],"tweet":true}');

        assert.deepEqual(options, {
            id: 'item-id',
            private: false,
            tags: ['go', 'qiita'],
            tweet: true,
        });
    });

    test("stringifyOptions creates default Qiita metadata", function() {
        assert.equal(
            stringifyOptions(),
            '{"id":"","private":true,"tags":[""],"tweet":false}'
        );
    });

    test("toQiitaTags converts metadata tags to Qiita API tag objects", function() {
        assert.deepEqual(toQiitaTags(['go', 'qiita']), [
            { name: 'go' },
            { name: 'qiita' },
        ]);
    });

    test("toQiitaPayload builds the Qiita item request body", function() {
        assert.deepEqual(
            toQiitaPayload('body', 'title', {
                private: false,
                tags: ['go'],
                tweet: true,
            }),
            {
                body: 'body',
                coediting: false,
                gist: false,
                group_url_name: 'dev',
                private: false,
                tags: [{ name: 'go' }],
                title: 'title',
                tweet: true,
            }
        );
    });
});
