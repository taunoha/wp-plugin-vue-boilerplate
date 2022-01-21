
import fs from 'fs';
import { GettextExtractor, JsExtractors } from 'gettext-extractor';

export default function gettextExtractorForWordpress(options) {

  const opts = {
      path: '',
      context: '',
      domain: '',
      ...options
  };

  return {
    name: 'extractStrings',
    apply: 'build',
    buildStart() {
      var php = ['<?php', '', "defined('ABSPATH') or die();", '', 'return array('];
      var messages = [];

      if( this.meta.watchMode ) {
          return;
      }

      const extractor = new GettextExtractor();

      extractor
          .createJsParser([
              JsExtractors.callExpression(['__', 'this.__'], {
                  arguments: {
                      text: 0,
                      context: 1
                  }
              }),
          ])
          .parseFilesGlob('./src/**/*.vue')
          .parseFilesGlob('./src/**/*.js');

      messages = extractor.getMessages();

      messages.forEach( (value) => {
          var text = value.text.replace(/__\('(.+)'\)/, '$1');
          var context = opts.context;

          if( value.context ) {
            context = context ? `${context} - ${value.context}` : value.context;
          }

          text = text.replace(/\\/g, '\\\\')
              .replace(/\u0008/g, '\\b')
              .replace(/\t/g, '\\t')
              .replace(/\n/g, '\\n')
              .replace(/\f/g, '\\f')
              .replace(/\r/g, '\\r')
              .replace(/'/g, '\\\'')
              .replace(/"/g, '\\"');

          php.push(`  // ${value.references.join(', ')}`);
          php.push(`  "${text}" => _x("${text}", '${context}', '${opts.domain}'),`);
      });

      php.push(');');

      if (!fs.existsSync(opts.path)){
          fs.mkdirSync(opts.path);
      }

      fs.writeFile(opts.path + '/messages.php', php.join("\r\n"), (err) =>  {
          if (err) throw err;
      });

      console.log( `✓ ${messages.length} string(s) extracted for WordPress.` );
    }
  }
}
