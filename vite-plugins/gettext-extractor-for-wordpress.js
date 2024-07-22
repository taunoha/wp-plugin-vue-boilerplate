
import fs from 'fs';
import { GettextExtractor, JsExtractors } from 'gettext-extractor';

const sanitizeText = (text) => text.replace(/\\/g, '\\\\')
  .replace(/\u0008/g, '\\b')
  .replace(/\t/g, '\\t')
  .replace(/\n/g, '\\n')
  .replace(/\f/g, '\\f')
  .replace(/\r/g, '\\r')
  .replace(/'/g, '\\\'')
  .replace(/"/g, '\\"');

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

      if (this.meta.watchMode) {
        return;
      }

      const extractor = new GettextExtractor();

      extractor
        .createJsParser([
          JsExtractors.callExpression(['__'], {
            arguments: {
              text: 0,
            }
          }),
        ])
        .parseFilesGlob('./src/**/*.vue')
        .parseFilesGlob('./src/**/*.js');

      extractor
        .createJsParser([
          JsExtractors.callExpression(['_n'], {
            arguments: {
              text: 0,
              textPlural: 1,
              context: 2
            }
          }),
        ])
        .parseFilesGlob('./src/**/*.vue')
        .parseFilesGlob('./src/**/*.js');

      extractor
        .createJsParser([
          JsExtractors.callExpression(['_x'], {
            arguments: {
              text: 0,
              context: 1
            }
          }),
        ])
        .parseFilesGlob('./src/**/*.vue')
        .parseFilesGlob('./src/**/*.js');

      extractor
        .createJsParser([
          JsExtractors.callExpression(['_nx'], {
            arguments: {
              text: 0,
              textPlural: 1,
              count: 2,
              context: 3
            }
          }),
        ])
        .parseFilesGlob('./src/**/*.vue')
        .parseFilesGlob('./src/**/*.js');

      messages = extractor.getMessages();

      messages.forEach((value) => {
        const { text, textPlural, context } = value;
        const _text = sanitizeText(text);
        const _textPlural = sanitizeText(textPlural || '');

        php.push(`  // ${value.references.join(', ')}`);

        if (context) {
          if (textPlural) {
            php.push(`  "${context}\u0004${_text}" => array(_x("${_text}", '${context}', '${opts.domain}'), _x("${_textPlural}", '${context}', '${opts.domain}')),`);
          } else {
            php.push(`  "${context}\u0004${_text}" => array(_x("${_text}", '${context}', '${opts.domain}')),`);
          }
        } else {
          if (textPlural) {
            php.push(`  "${_text}" => array(__("${_text}", '${opts.domain}'), __("${_textPlural}", '${opts.domain}')),`);
          } else {
            php.push(`  "${_text}" => array(__("${_text}", '${opts.domain}')),`);
          }
        }

      });

      php.push(');');

      if (!fs.existsSync(opts.path)) {
        fs.mkdirSync(opts.path);
      }

      fs.writeFile(opts.path + '/messages.php', php.join("\r\n"), (err) => {
        if (err) throw err;
      });

      console.log(`✓ ${messages.length} string(s) extracted for WordPress.`);
    }
  }
}
