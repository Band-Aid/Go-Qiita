const defaultTemplate = {
    id: '',
    private: true,
    tags: [''],
    tweet: false
};

function normalizeOptions(options) {
    const safeOptions = options || {};

    return {
        id: safeOptions.id || '',
        private: typeof safeOptions.private === 'boolean' ? safeOptions.private : true,
        tags: Array.isArray(safeOptions.tags) ? safeOptions.tags : [],
        tweet: typeof safeOptions.tweet === 'boolean' ? safeOptions.tweet : false
    };
}

function parseOptions(value) {
    return normalizeOptions(JSON.parse(value));
}

function stringifyOptions(options) {
    return JSON.stringify(normalizeOptions(options));
}

function createTemplate() {
    return normalizeOptions(defaultTemplate);
}

function createItemData(body, title, options) {
    const normalized = normalizeOptions(options);
    const tags = normalized.tags
        .filter(name => name)
        .map(name => ({name: name}));

    return {
        body: body,
        coediting: false,
        gist: false,
        group_url_name: 'dev',
        private: normalized.private,
        tags: tags,
        title: title,
        tweet: normalized.tweet
    };
}

module.exports = {
    createItemData: createItemData,
    createTemplate: createTemplate,
    normalizeOptions: normalizeOptions,
    parseOptions: parseOptions,
    stringifyOptions: stringifyOptions
};
