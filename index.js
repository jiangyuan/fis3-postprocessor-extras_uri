'use strict';


module.exports = function(content, file) {
    var r = /fis__extras__uri\((.+)\)/g;
    if (file.isHtmlLike) {
        content = content.replace(r, function(origin, target) {
            target = fis.project.lookup(target, file);

            if (target && target.file) {
                file.addLink(target.file.subpath);
                return target.file.getUrl();
            } else {
                return '';
            }
        });
    }
    return content;
};
