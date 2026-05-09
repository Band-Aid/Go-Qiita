const DEFAULT_OPTIONS = {
    id: '',
    private: true,
    tags: [''],
    tweet: false,
};

function normalizeTags(tags) {
    if (!Array.isArray(tags)) {
        return [];
    }

    return tags
        .map(tag => {
            if (typeof tag === 'string') {
                return tag;
            }

            if (tag && typeof tag.name === 'string') {
                return tag.name;
            }

            return '';
        })
        .filter(Boolean);
}

function normalizeOptions(options = {}) {
    return {
        id: typeof options.id === 'string' ? options.id : '',
        private: typeof options.private === 'boolean' ? options.private : DEFAULT_OPTIONS.private,
        tags: Array.isArray(options.tags) ? normalizeTags(options.tags) : DEFAULT_OPTIONS.tags,
        tweet: typeof options.tweet === 'boolean' ? options.tweet : DEFAULT_OPTIONS.tweet,
    };
}

function parseOptions(json) {
    const options = JSON.parse(json);

    if (!options || typeof options !== 'object' || Array.isArray(options)) {
        throw new TypeError('Qiita metadata must be a JSON object');
    }

    return normalizeOptions(options);
}

function stringifyOptions(options = {}) {
    return JSON.stringify({
        ...DEFAULT_OPTIONS,
        ...normalizeOptions(options),
    });
}

function toQiitaTags(tags) {
    return normalizeTags(tags).map(name => ({ name }));
}

function toQiitaPayload(body, title, options) {
    const normalizedOptions = normalizeOptions(options);

    return {
        body,
        coediting: false,
        gist: false,
        group_url_name: 'dev',
        private: normalizedOptions.private,
        tags: toQiitaTags(normalizedOptions.tags),
        title,
        tweet: normalizedOptions.tweet,
    };
}

module.exports = {
    DEFAULT_OPTIONS,
    normalizeOptions,
    parseOptions,
    stringifyOptions,
    toQiitaPayload,
    toQiitaTags,
};
