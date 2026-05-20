const assert = require('assert');
const QiitaJson = require('../qiita-json');

const options = QiitaJson.parseOptions('{"id":"abc123","private":false,"tags":["go","qiita"],"tweet":true}');
assert.deepStrictEqual(options, {
    id: 'abc123',
    private: false,
    tags: ['go', 'qiita'],
    tweet: true
});

const template = QiitaJson.createTemplate();
assert.deepStrictEqual(template, {
    id: '',
    private: true,
    tags: [''],
    tweet: false
});

const data = QiitaJson.createItemData('# Hello', 'Hello', options);
assert.deepStrictEqual(data, {
    body: '# Hello',
    coediting: false,
    gist: false,
    group_url_name: 'dev',
    private: false,
    tags: [{name: 'go'}, {name: 'qiita'}],
    title: 'Hello',
    tweet: true
});

assert.strictEqual(
    QiitaJson.stringifyOptions({tags: ['qiita']}),
    '{"id":"","private":true,"tags":["qiita"],"tweet":false}'
);
