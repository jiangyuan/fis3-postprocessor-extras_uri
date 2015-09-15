fis.config.merge({
    modules: {
        postpackager: 'extras_uri'
    },

    roadmap: {
        domain: 'http://test.cdn.io'
    },

    deploy: {
        dev: {
            to: '../dev'
        },
        dist: {
            to: '../dist'
        }
    }
});