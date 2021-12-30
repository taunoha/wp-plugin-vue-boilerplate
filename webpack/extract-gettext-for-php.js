const fs = require('fs');
const { GettextExtractor, JsExtractors, HtmlExtractors } = require('gettext-extractor');
const extractGettextForPHP = function(options) {
    const extractor = new GettextExtractor();
    var options = options || {
        path: '',
        context: '',
        domain: '',
        attrs: ['placeholder']
    };
    var php = ['<?php', '', "defined('ABSPATH') or die();", '', 'return array('];
    var messages = [];

    extractor
        .createJsParser([
            JsExtractors.callExpression(['__', 'this.__'], {
                arguments: {
                    text: 0
                }
            }),
        ])
        .parseFilesGlob('./src/**/*.vue')
        .parseFilesGlob('./src/**/*.js');

    for( attr of options.attrs )
    {
        extractor
            .createHtmlParser([
                HtmlExtractors.elementAttribute('*', `:${attr}`, {
                    arguments: {
                        text: 0
                    }
                })
            ])
            .parseFilesGlob('./src/**/*.vue');
    }

    messages = extractor.getMessages();


    messages.forEach( (value, index, array) => {
        var text = value.text.replace(/__\('(.+)'\)/, '$1');

        text = text.replace(/\\/g, '\\\\')
            .replace(/\u0008/g, '\\b')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\f/g, '\\f')
            .replace(/\r/g, '\\r')
            .replace(/'/g, '\\\'')
            .replace(/"/g, '\\"');

        php.push(`  // ${value.references.join(', ')}`);
        php.push(`  "${text}" => _x("${text}", '${options.context}', '${options.domain}'),`);
    });

    php.push(');');

    if (!fs.existsSync(options.path)){
        fs.mkdirSync(options.path);
    }

    fs.writeFile(options.path + '/messages.php', php.join("\r\n"), (err) =>  {
        if (err) throw err;
    });

};

module.exports = extractGettextForPHP;
