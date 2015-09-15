/**
 * index
 * @author jero
 * @date 2015-09-13
 */

var path = require('path');
var fis = require('fis3');
var expect = require('chai').expect;
var _release = fis.require('command-release/lib/release.js');
var _deploy = fis.require('command-release/lib/deploy.js');
var self = require('../');

function release(opts, cb) {
    opts = opts || {};
    cb = cb || function() {};

    _release(opts, function(err, info) {
        _deploy(info, cb)
    });
}



describe('postprocessor extras_uri', function () {
    var root = path.join(__dirname, 'src');

    fis.project.setProjectRoot(root);

    beforeEach(function() {
        var dev = path.join(__dirname, 'dev');

        fis.match('*', {
            deploy: fis.plugin('local-deliver', {
                to: dev
            }),

            postprocessor: self
        });

        fis.match('::image', {
            useHash: true,
            domain: 'http://www.test.com'
        });
    });


    it('extras', function () {// /index.html .links
        fis.on('release:end', function(ret) {
            var imgs = ['/img/test.jpeg', '/img/img/test.jpeg'];
            var indexFile = ret.src['/index.html'];
            var links = indexFile.links;
            var content = indexFile.getContent();
            links.forEach(function(link) {
                expect(imgs).to.include(link);   // index.html 关联所有的图片
            });

            expect(content).to.not.contain('fis__extras__uri'); // 不应该再有 fis__extras__uri 字符串
        });

        release({
            unique: true
        }, function() {
            console.log('release complete');
        });

        //expect(1).to.equal(1);
    });
});